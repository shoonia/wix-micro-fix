import { onMessage, sendMessage } from '../chrome';
import { TRapport, Events, createRapport } from '../transport';
import { createCache } from './cache';

type ILinkMap = Map<HTMLAnchorElement, string>;

const warnStyle: Partial<CSSStyleDeclaration> = {
  outline: 'rgb(255 193 7 / 80%) solid 10px',
  backgroundColor: 'rgb(255 235 60 / 45%)',
};

const errorStyle: Partial<CSSStyleDeclaration> = {
  outline: 'rgb(235 30 80 / 80%) solid 10px',
  backgroundColor: 'rgba(255, 0, 0, 0.4)',
};

const createHttpClient = () => {
  const cache = new Map<string, number>();

  const host = (location.host === 'wix.wixanswers.com')
    ? 'wix.wixanswers.com'
    : 'support.wix.com';

  return async (path: string): Promise<number> => {
    if (cache.has(path)) {
      return cache.get(path) ?? 0;
    }

    const apiUrl = `https://${host}/api/v1/helpcenter/articles/uri/${path}?locale=en`;

    try {
      const { ok, redirected, status } = await fetch(apiUrl, {
        method: 'head',
      });

      const code = (ok && redirected) ? 301 : status;

      cache.set(path, code);

      return code;
    } catch {
      return 0;
    }
  };
};

const getPath = (href: string): string => {
  return new URL(href).pathname.slice(12);
};

const getArticleLinks = (): ILinkMap => {
  const linkMap: ILinkMap = new Map();
  const currentPath = getPath(location.href);

  document.querySelectorAll('a').forEach((a) => {
    if (a.href.startsWith('https://support.wix.com/en/article/')) {
      const path = getPath(a.href);

      if (currentPath !== path) {
        linkMap.set(a, path);
      }
    }
  });

  return linkMap;
};

const checkLinks = async (): Promise<TRapport> => {
  const linkMap: ILinkMap = getArticleLinks();
  const getHttpStatus = createHttpClient();

  const rapport = createRapport({
    all: linkMap.size,
    isFirst: false,
  });

  for (const [node, path] of linkMap) {
    const code = await getHttpStatus(path);

    if (code === 200) {
      rapport.ok.push(path);
    }

    else if (code === 301) {
      Object.assign(node.style, warnStyle);
      rapport.warn.push(path);
    }

    else if (code === 404) {
      Object.assign(node.style, errorStyle);
      rapport.error.push(path);
    }
  }

  return rapport;
};

const cache = createCache();

onMessage((data) => {
  switch (data?.type) {
    case Events.checkPage: {
      void checkLinks().then((rapport) => {
        cache.set(rapport);

        sendMessage({
          type: Events.rapport,
          detail: rapport,
        });
      });

      break;
    }

    case Events.ping: {
      sendMessage({
        type: Events.pong,
        detail: cache.get(),
      });

      break;
    }
  }
});
