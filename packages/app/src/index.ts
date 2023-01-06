import { configure, start } from '@ui-framework/core';

import { goodConfiguration, httpConfiguration } from './configure';
import { createApp } from 'vue';
import App from './components/App/App';
import { router } from './navigation/router';

configure(httpConfiguration)
configure(goodConfiguration);

const app = createApp(App)
app.use(router);

start({ el: '#app' }).then(() => {
	app.mount('#app');
});
