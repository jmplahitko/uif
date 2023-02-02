import { provider, service } from '@ui-framework/core';
import { createPinia } from 'pinia';

const store = createPinia();

provider('Store', () => store);