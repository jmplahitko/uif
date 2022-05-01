import { ICommand } from './ICommand';
import { ICommandFactory } from './ICommandFactory';
import { ICommandProvider } from './ICommandProvider';

import { createCommand } from './createCommand';
import { isUndefined } from '@ui-framework/utils';

export function createCommandFactory(provider: ICommandProvider, serviceBus): ICommandFactory {
	const commands: Map<Static<any>, ICommand<any>> = new Map();

	return {
		get<T>(type: Static<T>): ICommand<T> {
			let command = commands.get(type);

			if (!command) {
				const hooks = provider.commands.get(type);

				if (hooks) {
					command = createCommand<T>(hooks, serviceBus);
					commands.set(type, command);
				} else {
					// TODO: throw an error here
				}
			}

			return command as ICommand<T>; // FIXME: This cast shouldn't need to be here.
		}
	}
}