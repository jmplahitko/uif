import './styles.scss';
import { h, ref, defineComponent, Suspense } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
	name: 'HelloWorld',
	props: {
		msg: {
			type: String,
			required: true
		}
	},
	setup: () => {
		const count = ref(0)
		return { count }
	},
	render() {
		return (
			<div>
				<h1>{ this.msg }</h1>
				<p>
					Recommended IDE setup:
					<a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
					+
					<a
						href="https://marketplace.visualstudio.com/items?itemName=octref.vetur"
						target="_blank"
					>Vetur</a>
					or
					<a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
					(if using
					<code>&lt;script setup&gt;</code>)
				</p>

				<p>See <code>README.md</code> for more information.</p>

				<p>
					<a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Docs</a> |
					<a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
				</p>

				<RouterLink to={{ name: 'auth' }}>Sign In</RouterLink>
			</div>
		)
	}
})
