const one = (selector) => document.querySelector(selector);
const all = (selector) => document.querySelectorAll(selector);

/** @type {HTMLButtonElement} */
const button = one('#checkLinks');

const setText = (selector, text) => {
  all(selector).forEach((i) => {
    i.textContent = `${text}`;
  });
};

/**
 * @param {boolean} isDisabled
 */
const togglePage = (isDisabled) => {
  button.disabled = isDisabled;
  document.body.classList.toggle('disabled', isDisabled);
};

/**
 *
 * @param {{ type: string, detail?: any }} data
 * @returns {Promise<void>}
 */
const sendMessage = async (data) => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tab.id, data, resolve);
  });
};

button.addEventListener('click', async () => {
  togglePage(true);
  setText('[data-rapport]', '-');

  await sendMessage({
    type: '>_CHECK_LINKS',
  });
});

chrome.runtime.onMessage.addListener(({ type, detail } = {}) => {
  switch (type) {
    case '>_RAPPORT': {
      /** @type {TRapport} */
      const { all, ok, warn, error } = detail;

      setText('#all', all);
      setText('#ok', ok);
      setText('#warn', warn);
      setText('#error', error);
      return togglePage(false);
    }

    case '>_ENABLE': {
      return togglePage(false);
    }
  }
});

sendMessage({
  type: '>_PING',
});
