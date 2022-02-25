import { defineConfig } from 'vite';
import path from 'path';

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
					'@ui-framework/utils'
				]
			}
		},
	}
});