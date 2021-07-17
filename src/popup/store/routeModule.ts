import type { TMoudule } from './types';
import { Route } from '../constants';

export const routeModule: TMoudule = ({ on }) => {
  on('@init', () => ({ route: Route.loading }));
  on('route/change', (_, route) => ({ route }));
};
