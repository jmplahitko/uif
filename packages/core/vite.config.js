import { defineConfig } from 'vite';
import path from 'path';
import nodeBuiltIns from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default defineConfig(({ command, mode }) => {
	return {
		build: {
			lib: {
				entry: path.resolve(__dirname, 'src/index.ts'),
				name: 'UIFramework',
				formats: ['es', 'cjs', 'umd'],
				fileName: 'ui-framework'
			},
			rollupOptions: {
				external: [
					'@ui-framework/eventing',
					'@ui-framework/ioc',
					'@ui-framework/http',
					'@ui-framework/http/fetch',
					'@ui-framework/http/fetch/responseParsingStrategies',
					'@ui-framework/navigation',
					'@ui-framework/observable',
					'@ui-framework/storage',
					'@ui-framework/utils',
					'@ui-framework/validation',
				],
				plugins: [
					// TODO: We may not need these plugins, but keeping them in case we end up needing to bundle any node objects
					{ ...globals(), name: 'rollup-plugin-node-globals' },
					{ ...nodeBuiltIns(), name: 'rollup-plugin-node-builtins' }
				]
			}
		},
	}
});