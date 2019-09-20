/**
 * CSS inject
 */
var link = document.createElement('link');

link.href = chrome.extension.getURL('inject.css');
link.type = 'text/css';
link.rel = 'stylesheet';

document.querySelector('head').appendChild(link);
