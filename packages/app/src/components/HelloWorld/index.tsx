import './styles.scss';
import using from '@ui-framework/core/runtime/using';
import { defineComponent } from 'vue';
import { FileResource, ResourceType } from '@ui-framework/core/resources';

export default defineComponent({
	name: 'HelloWorld',
	props: {
		msg: {
			type: String,
			required: true
		}
	},
	async setup() {
		const logo = await using<FileResource>('/src/assets/logo.png', { resourceType: ResourceType.file });

		return {
			img: logo.objectUrl
		}
	},
	render() {
		return (
			<div>
				<img alt="Vue logo" src={this.img} />
				<h1>{this.msg}</h1>
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
			</div>
		)
	}
})
