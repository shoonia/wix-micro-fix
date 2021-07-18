import type { TMoudule } from './types';
import { createReport } from '../../transport';
import { Route } from '../constants';

export const appModule: TMoudule = ({ on }) => {
  on('@init', () => ({
    report: createReport(),
    route: Route.loading,
  }));

  on('report/update', (_, report) => ({
    report,
    route: Route.report,
  }));

  on('route/change', (_, route) => ({
    route,
  }));
};
