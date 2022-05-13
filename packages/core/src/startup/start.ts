import { init as configure } from './configurations';
import { init as ready } from './configurations';
import { root } from '../containers';

let started = false;

export async function start(options: IStartupOptions) {
	return new Promise(async (resolve, reject) => {
		try {
			// TODO - we don't want start to be called more than once.
			if (started) return reject();
			else started = true;

			root.registerFactory('StartupOptions', () => options);

			await configure();
			await ready();

			resolve(null);
		} catch (e) {
			// TODO
			console.log(e);
			reject(e);
		}
	});
}