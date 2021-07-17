import type { TMoudule } from './types';
import { onMessage, sendTabMessage } from '../../chrome';
import { Events } from '../../transport';
import { Route } from '../constants';

export const messageModule: TMoudule = ({ dispatch }) => {
  const timeout = setTimeout(() => {
    dispatch('route/change', Route.notSupported);
  }, 500);

  onMessage((data) => {
    switch (data?.type) {
      case Events.pong: {
        const detail = data.detail;

        if (detail?.isFirst) {
          dispatch('route/change', Route.dashboard);
        } else {
          dispatch('rapport/update', detail);
        }

        clearTimeout(timeout);
        break;
      }

      case Events.rapport: {
        dispatch('rapport/update', data.detail);
        break;
      }
    }
  });

  void sendTabMessage({
    type: Events.ping,
  });
};
