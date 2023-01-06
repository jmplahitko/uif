import { createRouter, createWebHistory } from 'vue-router';
import { setPageTitle } from './middlewares/setPageTitle';
import { routes } from './routes';

export const router = createRouter({
	history: createWebHistory(),
	routes
});

router.beforeEach(setPageTitle)