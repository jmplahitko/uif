import { provider, service } from '@ui-framework/core/startup';
import { createRouter, createWebHistory } from 'vue-router';
import { setPageTitle } from './middlewares/setPageTitle';
import { routes } from './routes';

const router = createRouter({
	history: createWebHistory(),
	routes
});

router.beforeEach(setPageTitle);

provider('Router', () => router);