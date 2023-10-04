import { Router } from 'vue-router';
// import { authorize } from './router/middlewares/authorize';
import { routes } from './router/routes';

auth.$inject = ['Router', 'IHttpProvider'];
export function auth(router: Router) {
	routes.forEach(route => router.addRoute(route));
	// router.beforeEach(authorize);
}