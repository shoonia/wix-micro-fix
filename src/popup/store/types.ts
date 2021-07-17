import type { StoreonModule } from 'storeon';

import type { TReport } from '../../transport';
import type { Route } from '../constants';

export interface IState {
  report: TReport;
  route: Route;
}

export interface IEvents {
  'report/update': TReport;
  'route/change': Route;
}

export type TMoudule = StoreonModule<IState, IEvents>;
