import { Router } from 'vue-router';
import { authorize } from './navigation/middlewares/authorize';
import { authRoutes } from './navigation/routes';

auth.$inject = ['Router'];
export function auth(router: Router) {
	router.addRoute(authRoutes);
	router.beforeEach(authorize)

}