import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
	root: './',
	define: {
		__DEBUG__: mode === 'development'
	},
	plugins: [
		vue(),
	],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					// console.log(id)
					const match = id.match(/next-framework\/packages\/(\w*)/);
					if (match) {
						// console.log(match)
						return `ui-framework-${match[1]}`;
					}
				}
			}
		}
	}
}))
