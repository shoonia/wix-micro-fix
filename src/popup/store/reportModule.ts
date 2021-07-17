import type { TMoudule } from './types';
import { createReport } from '../../transport';
import { Route } from '../constants';

export const reportModule: TMoudule = ({ on }) => {
  on('@init', () => {
    return {
      report: createReport(),
    };
  });

  on('report/update', (_, report) => {
    return {
      report,
      route: Route.report,
    };
  });
};
