import { ready, start } from '@ui-framework/core';

import './router';
import './store';
import './startup/configure/http';
// import './startup/ready/testGetUser';
import './startup/ready/vue';



start({})
	.catch((e) => {
		console.log(e);
	});
