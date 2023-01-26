import { configure, ready, start } from '@ui-framework/core';

import { goodConfiguration, httpConfiguration } from './configure';
import { createApp } from 'vue';
import App from './components/App/App';
import { router } from './navigation/router';
import { testGetUser } from './ready/testGetUser';

configure(httpConfiguration)
configure(goodConfiguration);

const app = createApp(App)
app.use(router);

ready(testGetUser)

start({ el: '#app' }).then(() => {

	app.mount('#app');
});
