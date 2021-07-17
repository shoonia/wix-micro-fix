import { createStoreon } from 'storeon';

import type { IEvents, IState } from './types';
import { routeModule } from './routeModule';
import { rapportModule } from './rapportModule';
import { messageModule } from './messageModule';

export const store = createStoreon<IState, IEvents>([
  routeModule,
  rapportModule,
  messageModule,
]);
