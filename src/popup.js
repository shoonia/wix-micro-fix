const one = (selector) => document.querySelector(selector);

const setText = (selector, text) => {
  one(selector).textContent = text;
};

/**
 * @returns {Promise<chrome.tabs.Tab[]>}
 */
const getTabs = () => {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, resolve);
  });
}

/** @type {HTMLButtonElement} */
const button = one('#checkLinks');

button.addEventListener('click', async () => {
  button.disabled = true;

  const [tab] = await getTabs();

  button.disabled = false;
  chrome.tabs.sendMessage(tab.id, {
    type: '>_CHECK_LINKS'
  });
});

chrome.runtime.onMessage.addListener((event = {}) => {
  if (event.type === '>_RAPPORT') {
    /** @type {TRapport} */
    const rapport = event.detail;

    setText('#all', rapport.all);
    setText('#ok', rapport.ok);
    setText('#warn', rapport.warn);
    setText('#error', rapport.error);
  }
});
