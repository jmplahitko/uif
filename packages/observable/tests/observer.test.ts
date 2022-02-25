import observable from '../src/observable';

describe('default function', () => {
	it('should be defined', () => {
		expect(observable).toBeDefined();
	});

	it('should be a function', () => {
		expect(typeof observable).toEqual('function');
	});
});

describe('state', () => {
	const initialState = {
		hello: 'world',
	};

	it('should be defined', () => {
		const { state } = observable(initialState);
		expect(state).toBeDefined();
	});

	it('should be the same state', () => {
		const { state } = observable(initialState);
		expect(state).toEqual(initialState);
	});
});

describe('observe', () => {
	const initialState = {
		hello: 'world',
	};

	it('should be defined', () => {
		const { observe } = observable(initialState);
		expect(observe).toBeDefined();
	});

	it('should be a function', () => {
		const { observe } = observable(initialState);
		expect(typeof observe).toEqual('function');
	});

	it('should not observe if state is not modified', () => {
		const { observe } = observable(initialState);
		const observer = jest.fn();

		observe(x => x.hello)(observer);

		expect(observer).not.toHaveBeenCalled();
	});

	it('should detect simple array index assignments', () => {
		const { state, observe } = observable({
			strs: ['default'] as string[],
		});
		const observer = jest.fn();

		observe(x => x.strs)(observer);

		state.strs = [];

		expect(observer).toHaveBeenCalledWith([], ['default']);

		state.strs.push('test1');

		expect(observer).toHaveBeenCalledWith(['test1'], []);
		expect(state.strs.length).toEqual(1);

		state.strs.push('test2');

		expect(observer).toHaveBeenCalledWith(['test1', 'test2'], ['test1']);
		expect(state.strs.length).toEqual(2);

		state.strs[2] = 'test3';

		expect(observer).toHaveBeenCalledWith(['test1', 'test2', 'test3'], ['test1', 'test2']);
		expect(state.strs.length).toEqual(3);

		state.strs.unshift('test4');

		expect(observer).toHaveBeenCalledWith(['test4', 'test1', 'test2', 'test3'], ['test1', 'test2', 'test3']);

		state.strs.reverse();

		expect(observer).toHaveBeenCalledWith(['test3', 'test2', 'test1', 'test4'], ['test4', 'test1', 'test2', 'test3']);

		state.strs.sort();

		expect(observer).toHaveBeenCalledWith(['test1', 'test2', 'test3', 'test4'], ['test3', 'test2', 'test1', 'test4']);

		state.strs.splice(0, 1, 'test5');

		expect(observer).toHaveBeenCalledWith(['test5', 'test2', 'test3', 'test4'], ['test1', 'test2', 'test3', 'test4']);
	});

	it('should detect array element deletion method calls', () => {
		const { state, observe } = observable({
			strs: ['test1', 'test2'],
		});
		const observer = jest.fn();

		observe(x => x.strs)(observer);

		const popped = state.strs.pop();

		expect(observer).toHaveBeenCalledWith(['test1'], ['test1', 'test2']);
		expect(popped).toEqual('test2');

		const shifted = state.strs.shift();

		expect(observer).toHaveBeenCalledWith([], ['test1']);
		expect(shifted).toEqual('test1');
	});

	it('should observe one level deep', () => {
		const { state, observe } = observable(initialState);
		const observer = jest.fn();

		observe(x => x.hello)(observer);

		state.hello = 'updated';
		expect(observer).toHaveBeenCalledWith('updated', 'world');
	});

	it('should observe two level deep', () => {
		const { state, observe } = observable({
			hello: {
				world: 'hello',
			},
		});
		const observer = jest.fn();

		observe(x => x.hello.world)(observer);

		state.hello.world = 'updated';
		expect(observer).toHaveBeenCalledWith('updated', 'hello');
	});

	it('should observe three level deep', () => {
		const { state, observe } = observable({
			hello: {
				world: {
					john: 'doe',
				},
			},
		});
		const observer = jest.fn();

		observe(x => x.hello.world.john)(observer);

		state.hello.world.john = 'updated';
		expect(observer).toHaveBeenCalledWith('updated', 'doe');
	});

	it('should observe two level deep only on specified value', () => {
		const { state, observe } = observable({
			hello: {
				world: 'hello',
			},
		});
		const observer = jest.fn();

		observe(x => x.hello.world)(observer);

		state.hello = { world: 'updated' };
		expect(observer).not.toHaveBeenCalled();
	});

	it('should observe multiple values', () => {
		const { state, observe } = observable({
			hello: {
				world: 'hello',
			},
			user: 'john',
		});
		const helloWorldobserver = jest.fn();
		const userobserver = jest.fn();

		observe(x => x.hello.world)(helloWorldobserver);
		observe(x => x.user)(userobserver);

		state.hello.world = 'updated';
		state.user = 'jane';

		expect(helloWorldobserver).toHaveBeenCalledWith('updated', 'hello');
		expect(userobserver).toHaveBeenCalledWith('jane', 'john');
	});

	it('should observe multiple times', () => {
		const { state, observe } = observable({
			hello: {
				world: 'hello',
			},
		});
		const observer = jest.fn();

		observe(x => x.hello.world)(observer);

		state.hello.world = 'updated';
		expect(observer).toHaveBeenCalledWith('updated', 'hello');

		state.hello.world = 'modified';
		expect(observer).toHaveBeenCalledWith('modified', 'updated');
	});

	it('should modify the state', () => {
		const { state, observe } = observable({
			hello: {
				world: 'hello',
			},
		});
		const observer = jest.fn();

		observe(x => x.hello.world)(observer);

		state.hello.world = 'updated';
		expect(observer).toHaveBeenCalledWith('updated', 'hello');
		expect(state.hello.world).toEqual('updated');
	});
});

describe('observeOnce', () => {
	const initialState = {
		hello: 'world',
	};

	it('should be defined', () => {
		const { observeOnce } = observable(initialState);
		expect(observeOnce).toBeDefined();
	});

	it('should be a function', () => {
		const { observeOnce } = observable(initialState);
		expect(typeof observeOnce).toEqual('function');
	});

	it('should observe once', () => {
		const { state, observeOnce } = observable({
			hello: {
				world: 'hello',
			},
		});
		const observer = jest.fn();

		observeOnce(x => x.hello.world)(observer);

		state.hello.world = 'updated';
		expect(observer).toHaveBeenCalledWith('updated', 'hello');

		state.hello.world = 'modified';
		expect(observer).not.toHaveBeenCalledWith('modified', 'updated');
	});
});

describe('ignore', () => {
	const initialState = {
		hello: 'world',
	};

	it('should be defined on observe', () => {
		const { observe } = observable(initialState);
		const ignore = observe(x => x.hello)(() => undefined);

		expect(ignore).toBeDefined();
	});

	it('should be defined on observeOnce', () => {
		const { observeOnce } = observable(initialState);
		const ignore = observeOnce(x => x.hello)(() => undefined);

		expect(ignore).toBeDefined();
	});

	it('should be a function on observe', () => {
		const { observe } = observable(initialState);
		const ignore = observe(x => x.hello)(() => undefined);

		expect(typeof ignore).toEqual('function');
	});

	it('should be a function on observeOnce', () => {
		const { observeOnce } = observable(initialState);
		const ignore = observeOnce(x => x.hello)(() => undefined);

		expect(typeof ignore).toEqual('function');
	});

	it('should observe multiple times until ignore is called', () => {
		const { state, observe } = observable({
			hello: {
				world: 'hello',
			},
		});
		const observer = jest.fn();

		const ignore = observe(x => x.hello.world)(observer);

		state.hello.world = 'updated';
		expect(observer).toHaveBeenCalledWith('updated', 'hello');

		state.hello.world = 'modified';
		expect(observer).toHaveBeenCalledWith('modified', 'updated');

		ignore();

		state.hello.world = 're-updated';
		expect(observer).not.toHaveBeenCalledWith('re-updated', 'modified');
	});
});