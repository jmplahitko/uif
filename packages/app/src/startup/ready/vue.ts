import { ready } from '@ui-framework/core/startup';
import { Pinia } from 'pinia';
import { createApp } from 'vue';
import { Router } from 'vue-router';
import App from '../../components/App';


startVue.$inject = ['Router', 'Store'];
function startVue(router: Router, store: Pinia) {
	const app = createApp(App);

	app
		.use(router)
		.use(store)
		.mount('#app');
}

ready(startVue);