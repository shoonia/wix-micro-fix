const one = (selector) => document.querySelector(selector);

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
  chrome.tabs.sendMessage(tab.id, { type: '>_CHECK_LINKS' });
});
