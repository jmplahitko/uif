import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { use } from '@ui-framework/core';
import { AuthContext, Authenticate, IAuthProvider } from '@ui-framework/auth/.';

export const useAuthStore = defineStore('auth', async () => {
	let user = reactive({
		lookupKey: '',
		firstName: '',
		lastName: '',
	});

	let context = reactive<AuthContext>({
		provider: '',
		username: '',
		claims: {},
		oauthState: {},
		redirectUrl: ''
	});

	const provider: IAuthProvider = (await use('IAuthProvider'))[0];
	console.log(provider);
	async function getMe() {
		user = {
			lookupKey: 'abc',
			firstName: 'J',
			lastName: 'P',
		};

		return user;
	}

	return {
		context,
		user,
		getMe,
		async check() {
			return null;
		},
		async login(authenticate: Authenticate) {
			context = await provider.login(authenticate);
			await getMe();
			return context;
		},
		async logout(authenticate: Authenticate) {
			return await provider.logout(authenticate);
		}
	}
});