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

const getPath = (href) => {
  return new URL(href).pathname.slice(12);
}

const checkLinks = async () => {
  const nodeMap = new Map();
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
      Object.assign(node.style, {
        outline: 'rgb(235 30 80 / 80%) solid 10px',
        backgroundColor: 'rgba(255, 0, 0, 0.4)',
      });
    }

    if (code === 301) {
      Object.assign(node.style, {
        outline: 'rgb(255 193 7 / 80%) solid 10px',
        backgroundColor: 'rgb(255 235 60 / 45%)',
      })
    }
  }
}

chrome.runtime.onMessage.addListener((event) => {
  switch (event.type) {
    case '>_CHECK_LINKS': {
      return checkLinks();
    }
  }
});
