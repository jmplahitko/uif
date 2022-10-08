import { EventEmitter } from 'events';

/**
 * Wraps a Node EventEmitter so that additional checks/hooks can be added without
 * re-implementing or extending EventEmitter itself.
 * TODO: Don't wrap EventEmitter .. some day.
 */

export default class EventBus {
	private _emitter: EventEmitter;
	private _logger;
	private _eventWarningThreshold: number = 5;

	constructor(logger) {
		this._emitter = new EventEmitter();
		this._logger = logger;
	}

	public addEventListener(event: string | symbol, listener: (...args: any[]) => void): EventBus {
		// Fact: addEventListener is an alias for emmitter.on() - Please, only do updates to emitter.on() to keep this fact true.
		this.on(event, listener);
		return this;
	}

	public emit(eventName: string | symbol, ...args: any[]): boolean {
		let listenerCount = this.listenerCount(eventName);
		let listeners = this._emitter.listeners ? this._emitter.listeners(eventName).map((listener) => listener.name) : ['unable to retrieve listeners in this version of node.js'];
		let hasListeners = this._emitter.emit(eventName, ...args);
		let eventLog = {
			eventName,
			listenerCount: listenerCount,
			listeners,
			payload: args
		};

		if (hasListeners) {
			this._logger.info(`{$events} - Emitted Event: `, eventLog);
		} else {
			this._logger.warn(`{$events} - Emitted Absent Event: `, eventLog);
		}

		return hasListeners;
	}

	public eventNames(): Array<string | symbol> {
		let eventNames = this._emitter.eventNames();

		return eventNames;
	}

	public getMaxListeners(): number {
		let maxListeners = this._emitter.getMaxListeners();

		return maxListeners;
	}

	public listenerCount(eventName: string | symbol): number {
		let listenerCount = this._emitter.listenerCount(eventName);

		return listenerCount;
	}

	public on(eventName: string | symbol, listener: (...args: any[]) => void): EventBus {
		this._emitter.on(eventName, listener);
		let listenerCount = this.listenerCount(eventName);
		this._logger.info(`{$events} - Listener Registered: `, {
			eventName,
			listenerCount,
			listener: listener.name
		});
		if (listenerCount >= this._eventWarningThreshold) {
			this._logger.warn(`{$events} - High Listener Count for "${String(eventName)}" (${listenerCount}). A high listener count may be pointing to a memory leak. Check to make sure you are removing any listeners that are not needed after they have fulfilled their purpose.`);
		}

		return this;
	}

	public once(eventName: string | symbol, listener: (...args: any[]) => void): EventBus {
		this._emitter.once(eventName, listener);
		this._logger.info(`{$events} - Listener Registered Once: `, {
			eventName,
			listenerCount: this.listenerCount(eventName),
			listener: listener.name
		});

		return this;
	}

	public prependListener(eventName: string | symbol, listener: (...args: any[]) => void): EventBus {
		this._emitter.prependListener(eventName, listener);
		this._logger.info(`{$events} - Prepended Listener Registered: `, {
			eventName,
			listenerCount: this.listenerCount(eventName),
			listener: listener.name
		});

		return this;
	}

	public prependOnceListener(eventName: string | symbol, listener: (...args: any[]) => void): EventBus {
		this._emitter.prependOnceListener(eventName, listener);
		this._logger.info(`{$events} - Prepended Listener Registered Once: `, {
			eventName,
			listenerCount: this.listenerCount(eventName),
			listener: listener.name
		});

		return this;
	}

	public removeAllListeners(eventName: string | symbol): EventBus {
		this._emitter.removeAllListeners(eventName);
		this._logger.warn(`{$events} - All Listeners Removed`);

		return this;
	}

	public removeListener(eventName: string | symbol, listener: (...args: any[]) => void): EventBus {
		this._emitter.removeListener(eventName, listener);
		this._logger.info(`{$events} - Listener Removed: `, {
			eventName,
			listenerCount: this.listenerCount(eventName),
			listener: listener.name
		});

		return this;
	}

	public setMaxListeners(number: number): EventBus {
		this._emitter.setMaxListeners(number);

		return this;
	}
}
