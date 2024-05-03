import { ready, start } from '@ui-framework/core/startup';

import './router';
import './store';
import './startup/configure/http';
import './startup/ready/vue';

const startupOptions = {
	settings: {}
}

start(startupOptions)
	.catch((e) => {
		console.log(e);
	});
