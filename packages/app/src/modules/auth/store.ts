import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
	let _user;
	const user = computed(() => _user);

	function getMe() {
		console.log('getMe');
		_user = {
			id: 1
		}
	}

	return {
		getMe
	}
});