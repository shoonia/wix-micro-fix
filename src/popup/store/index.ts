import { createStoreon } from 'storeon';

import type { IEvents, IState } from './types';
import { routeModule } from './routeModule';
import { reportModule } from './reportModule';
import { messageModule } from './messageModule';

export const store = createStoreon<IState, IEvents>([
  routeModule,
  reportModule,
  messageModule,
]);
