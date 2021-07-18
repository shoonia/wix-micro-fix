import { createStoreon } from 'storeon';

import type { IEvents, IState } from './types';
import { appModule } from './appModule';
import { messageModule } from './messageModule';

export const store = createStoreon<IState, IEvents>([
  appModule,
  messageModule,
]);
