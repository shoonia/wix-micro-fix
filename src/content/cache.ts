import { createReport, TReport } from '../transport';

interface ICreateCache {
  set(report: TReport): void;
  get(): TReport;
}

export const createCache = (): ICreateCache => {
  let href: string;
  let lastReport: TReport | null;

  return {
    set(report: TReport): void {
      href = location.href;
      lastReport = report;
    },

    get(): TReport {
      if (lastReport !== null && location.href === href) {
        return lastReport;
      }

      lastReport = null;

      return createReport();
    },
  };
};
