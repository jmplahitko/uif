import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
	{
		name: 'home',
		path: '/',
		props: {
			msg: 'What up..'
		},
		component: () => import('../components/HelloWorld/HelloWorld'),
		meta: {
			pageTitle: 'Home'
		}
	}
];