import { NavigationGuard } from 'vue-router';
import { useAuthStore } from '../../store';

export const authorize: NavigationGuard = (to, from, next) => {
	console.log('authorize', to, from);
	const store = useAuthStore();
	store.getMe();

	next();
};
