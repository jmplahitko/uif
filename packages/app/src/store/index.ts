import { provider, service } from '@ui-framework/core/startup';
import { createPinia } from 'pinia';

const store = createPinia();

provider('Store', () => store);