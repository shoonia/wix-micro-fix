/** @type {Partial<CSSStyleDeclaration>} */
const warnStyle = {
  outline: 'rgb(255 193 7 / 80%) solid 10px',
  backgroundColor: 'rgb(255 235 60 / 45%)',
};

/** @type {Partial<CSSStyleDeclaration>} */
const errorStyle = {
  outline: 'rgb(235 30 80 / 80%) solid 10px',
  backgroundColor: 'rgba(255, 0, 0, 0.4)',
};

/**
 * @returns {(path: string) => Promise<number>}
 */
const createHttpClient = () => {
  /** @type {Map<string, number>} */
  const cache = new Map();

  return async (path) => {
    if (cache.has(path)) {
      return cache.get(path);
    }

    const apiUrl = `https://support.wix.com/api/v1/helpcenter/articles/uri/${path}?locale=en`;

    try {
      const { ok, redirected, status } = await fetch(apiUrl, {
        method: 'head',
      });

      const code = (ok && redirected) ? 301 : status;

      cache.set(path, code);

      return code;
    } catch (error) {
      return -1;
    }
  };
};

/**
 * @param {string} href
 * @returns {string}
 */
const getPath = (href) => {
  return new URL(href).pathname.slice(12);
};

/**
 * @typedef {Map<HTMLAnchorElement, string>} LinkMap
 * @returns {LinkMap}
 */
const getArticleLinks = () => {
  /** @type {LinkMap} */
  const linkMap = new Map();
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

/**
 * @returns {Promise<TRapport>}
 */
const checkLinks = async () => {
  const linkMap = getArticleLinks();
  const getHttpStatus = createHttpClient();

  /** @type {TRapport} */
  const rapport = {
    all: linkMap.size,
    ok: 0,
    warn: 0,
    error: 0
  };

  for (const [node, path] of linkMap) {
    const code = await getHttpStatus(path);

    if (code === 200) {
      rapport.ok++;
    }

    if (code === 404) {
      Object.assign(node.style, errorStyle);
      rapport.error++;
    }

    if (code === 301) {
      Object.assign(node.style, warnStyle);
      rapport.warn++;
    }
  }

  return rapport;
};

chrome.runtime.onMessage.addListener(async (event) => {
  if (event.type === '>_CHECK_LINKS') {
    const rapport = await checkLinks()

    chrome.runtime.sendMessage({
      type: '>_RAPPORT',
      detail: rapport,
    });
  }
});
