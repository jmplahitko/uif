import { h, ref, defineComponent, Suspense } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useAuthStore } from '../../store';
import { AuthRequestType } from '@ui-framework/auth/.';
import { storeToRefs } from 'pinia';

export default defineComponent({
	name: 'Signin',
	setup: async () => {
		const auth = await useAuthStore();
 		console.log(auth)

		return () => (
			<div>
				<h1>Sign In</h1>
				<button onClick={() => auth.login({
					type: AuthRequestType.oauth,
					provider: 'access-indiana',
					returnUrl: 'http://localhost:5173/'
				})}>Do it.</button>
			</div>
		)
	}
})
