/** @type {Partial<CSSStyleDeclaration>} */
const imgError = {
  outline: 'rgb(235 30 80 / 80%) solid 5px',
  outlineOffset: '5px',
};

const checkImages = () => {
  document.querySelectorAll('img').forEach((img) => {
    if (img.complete && img.naturalHeight === 0) {
      Object.assign(img.style, imgError);
    }
  });
};

chrome.runtime.onMessage.addListener(({ type } = {}) => {
  switch (type) {
    case '>_CHECK_LINKS': {
      checkImages();
    }
  }
});
