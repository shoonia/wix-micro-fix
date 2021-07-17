const imgError: Partial<CSSStyleDeclaration> = {
  outline: 'rgb(235 30 80 / 80%) solid 5px',
  outlineOffset: '5px',
};

export const checkImages = (): number => {
  let count = 0;

  document.querySelectorAll('img').forEach((img) => {
    if (img.complete && img.naturalHeight === 0) {
      count++;
      Object.assign(img.style, imgError);
    }
  });

  return count;
};
