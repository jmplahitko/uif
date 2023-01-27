import { createApp } from 'vue';
import { configure, ready, start } from '@ui-framework/core';
import { configure as config } from './configure';

import App from './components/App/App';
import { router } from './navigation/router';
import { testGetUser } from './ready/testGetUser';

const app = createApp(App);

app.use(router);

configure(config);
ready(testGetUser);
start({ el: '#app' })
	.then(() => {

		app.mount('#app');
	})
	.catch((e) => {
		console.log(e);
	})
