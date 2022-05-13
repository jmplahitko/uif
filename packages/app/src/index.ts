import { configure, start, ready } from '@ui-framework/core';

import { helloWorld } from './splash/helloWorld';
import { iCanHazDadJoke } from './ready/http/get/iCanHazDadJoke';
import { badConfiguration, goodConfiguration, httpConfiguration } from './configure';



configure(httpConfiguration)
configure(goodConfiguration);
// configure(badConfiguration);

// ready(iCanHazDadJoke);

start({
	el: '#app',
	splash: helloWorld
})
	.then(console.log.bind(console))
	.catch(console.log.bind(console));