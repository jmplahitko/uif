import { createAppHost } from '@ui-framework/core';

import { helloWorld } from './splash/helloWorld';
import { iCanHazDadJoke } from './ready/http/get/iCanHazDadJoke';
import { badConfiguration, goodConfiguration, httpConfiguration } from './configure';

const { configure, ready, start } = createAppHost({
	el: '#app',
	splash: helloWorld
});

configure(httpConfiguration)
configure(goodConfiguration);
// configure(badConfiguration);

ready(iCanHazDadJoke);

start()
	.then(console.log.bind(console))
	.catch(console.log.bind(console));