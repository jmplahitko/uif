export type CreateAppOptions = {
	el: string,
	settingsUrl?: string;
	splash?: (el: HTMLElement) => void
}

export {
	register as registerConfiguration,
	init as configure
} from './configurations';

export {
	register as registerModule,
} from './modules';

export {
	register as registerPlugin,
	init as connectPlugins
} from './plugins';

export {
	register as registerReadyCallback,
	init as ready
} from './ready';

export { start } from './start';