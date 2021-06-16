const one = (selector) => document.querySelector(selector);

const getTabs = () => {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, resolve);
  });
}

const button = one('#checkLinks');

button.addEventListener('click', async () => {
  button.disabled = true;

  const [tab] = await getTabs();

  button.disabled = false;
  chrome.tabs.sendMessage(tab.id, { type: '>_CHECK_LINKS' });
});
