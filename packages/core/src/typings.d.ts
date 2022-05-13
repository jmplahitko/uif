declare interface IAppContext {}

declare interface IAppSettings {}

declare interface IState {}

declare interface IStartupOptions {
	el: string,
	settingsUrl?: string;
	splash?: (el: HTMLElement) => void
}