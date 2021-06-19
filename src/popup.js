const one = (selector) => document.querySelector(selector);
const all = (selector) => document.querySelectorAll(selector);

const setText = (selector, text) => {
  all(selector).forEach((i) => {
    i.textContent = `${text}`;
  });
};

/**
 * @returns {Promise<chrome.tabs.Tab[]>}
 */
const getTabs = () => {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, resolve);
  });
};

/** @type {HTMLButtonElement} */
const button = one('#checkLinks');

button.addEventListener('click', async () => {
  button.disabled = true;
  setText('[data-rapport]', '-');

  const [tab] = await getTabs();

  const data = {
    type: '>_CHECK_LINKS'
  };

  chrome.tabs.sendMessage(tab.id, data, () => {
    button.disabled = false;
  });
});

chrome.runtime.onMessage.addListener((event = {}) => {
  if (event.type === '>_RAPPORT') {
    /** @type {TRapport} */
    const { all, ok, warn, error } = event.detail;

    setText('#all', all);
    setText('#ok', ok);
    setText('#warn', warn);
    setText('#error', error);
  }
});
