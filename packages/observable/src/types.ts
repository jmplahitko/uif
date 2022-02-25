export type ObservablesCache = {
	[key: string]: Array<Observer<any>>;
};

export type Observer<P> = {
	id: number;
	onChange: ObserverCallback<P>;
	once: boolean;
	ignore: () => void
};

export type ObserverCallback<V> = (newValue: V, oldValue: V) => void;

export type Observable<T extends object> = {
	state: T,
	observe: <P>(selector: Selector<T, P>) => (onChange: ObserverCallback<P>) => () => void;
	observeOnce: <P>(selector: Selector<T, P>) => (onChange: ObserverCallback<P>) => () => void;
	conceal: () => void;
};

