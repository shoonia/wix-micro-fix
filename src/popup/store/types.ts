import type { StoreonModule } from 'storeon';

import type { TRapport } from '../../transport';
import type { Route } from '../constants';

export interface IState {
  rapport: TRapport;
  route: Route;
}

export interface IEvents {
  'rapport/update': TRapport;
  'route/change': Route;
}

export type TMoudule = StoreonModule<IState, IEvents>;
