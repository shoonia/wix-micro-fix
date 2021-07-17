import { createRapport, TRapport } from '../transport';

interface ICreateCache {
  set(rapport: TRapport): void;
  get(): TRapport;
}

export const createCache = (): ICreateCache => {
  let href: string;
  let lastRapport: TRapport | null;

  return {
    set(rapport: TRapport): void {
      href = location.href;
      lastRapport = rapport;
    },

    get(): TRapport {
      if (lastRapport !== null && location.href === href) {
        return lastRapport;
      }

      lastRapport = null;

      return createRapport();
    },
  };
};
