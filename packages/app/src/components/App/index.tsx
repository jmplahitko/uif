import './styles.scss';
import { Suspense, defineComponent, h } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
	name: 'App',
	render() {
		return (
			<div>
				<Suspense>
					<RouterView />
				</Suspense>
			</div>
		)
	}
})