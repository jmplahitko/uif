import { h, ref, defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

export default defineComponent({
	name: 'Signin',
	setup: () => {

	},
	render() {
		return (
			<div>
				<h1>Sign In</h1>
				<RouterView />
			</div>
		)
	}
})
