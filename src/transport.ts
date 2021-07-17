export interface TReport {
  all: number;
  ok: string[];
  error: string[];
  warn: string[];
  isFirst: boolean;
  images: number;
}

export const enum Events {
  ping = '>_PING',
  pong = '>_PONG',
  checkPage = '>_CHECK_PAGE',
  report = '>_REPORT',
}

export const createReport = (data?: Partial<TReport>): TReport => ({
  all: 0,
  ok: [],
  warn: [],
  error: [],
  isFirst: true,
  images: 0,
  ...data,
});
