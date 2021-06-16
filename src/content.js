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
 *
 * @param {string} path
 * @param {Map<string, number>} cache
 * @returns {Promise<number>}
 */
const getHttpCode = async (path, cache) => {
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
}

/**
 *
 * @param {string} href
 * @returns {string}
 */
const getPath = (href) => {
  return new URL(href).pathname.slice(12);
}

const checkLinks = async () => {
  /** @type {Map<HTMLElement, string>} */
  const nodeMap = new Map();
  /** @type {Map<string, number>} */
  const statusCache = new Map();

  const currentPath = getPath(location.href);

  Array.from(document.links).forEach((node) => {
    if (node.href.startsWith('https://support.wix.com/en/article/')) {
      const path = getPath(node.href);

      if (currentPath !== path) {
        nodeMap.set(node, path);
      }
    }
  });

  for (const [node, path] of nodeMap) {
    const code = await getHttpCode(path, statusCache);

    if (code === 404) {
      Object.assign(node.style, errorStyle);
    }

    if (code === 301) {
      Object.assign(node.style, warnStyle);
    }
  }
}

chrome.runtime.onMessage.addListener((event) => {
  if (event.type === '>_CHECK_LINKS') {
    checkLinks();
  }
});
