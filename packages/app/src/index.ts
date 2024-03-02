import { ready, start } from '@ui-framework/core';

import './router';
import './store';
import './startup/configure/http';
// import './startup/ready/testGetUser';
import './startup/ready/vue';

const startupOptions: IStartupOptions = {
	settings: {}
}

start(startupOptions)
	.catch((e) => {
		console.log(e);
	});
