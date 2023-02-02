import { RouteRecordRaw } from 'vue-router';

export const authRoutes: RouteRecordRaw = {
	name: 'auth',
	path: '/auth',
	component: () => import('../components/Signin'),
	meta: {

	}
};