export interface TRapport {
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
  rapport = '>_RAPPORT',
}

export const createRapport = (data?: Partial<TRapport>): TRapport => ({
  all: 0,
  ok: [],
  warn: [],
  error: [],
  isFirst: true,
  images: 0,
  ...data,
});
