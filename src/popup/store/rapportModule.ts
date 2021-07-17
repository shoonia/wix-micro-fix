import type { TMoudule } from './types';
import { createRapport } from '../../transport';
import { Route } from '../constants';

export const rapportModule: TMoudule = ({ on }) => {
  on('@init', () => {
    return {
      rapport: createRapport(true),
    };
  });

  on('rapport/update', (_, rapport) => {
    return {
      rapport,
      route: Route.rapport,
    };
  });
};
