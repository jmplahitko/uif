import { configure, start, ready } from '@ui-framework/core';

import { iCanHazDadJoke } from './ready/http/get/iCanHazDadJoke';
import { badConfiguration, goodConfiguration, httpConfiguration } from './configure';

configure(httpConfiguration)
configure(goodConfiguration);
// configure(badConfiguration);

// ready(iCanHazDadJoke);

start({
	el: '#app'
})
	.then(console.log.bind(console))
	.catch(console.log.bind(console));