import { ready, start } from '@ui-framework/core';

import './navigation';
import './store';
import './startup/configure/http';
// import './startup/ready/testGetUser';
import './startup/ready/vue';

import './modules/auth';

start({})
	.catch((e) => {
		console.log(e);
	});
