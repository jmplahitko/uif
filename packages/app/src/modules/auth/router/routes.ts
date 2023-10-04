import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
	{
		name: 'auth',
		path: '/auth',
		component: () => import('../components/Signin'),
		meta: {
			pageTitle: 'Auth'
		}
	},
];
