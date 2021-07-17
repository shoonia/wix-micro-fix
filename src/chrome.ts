/// <reference types="chrome"/>
import type { Events, TRapport } from './transport';

interface IMessage {
  type: Events;
  detail?: TRapport;
}

export const sendTabMessage = async (message?: IMessage): Promise<void> => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  const tabId = tab.id;

  if (typeof tabId === 'number') {
    chrome.tabs.sendMessage(tabId, message);
  }
};

export const sendMessage = (message?: IMessage): void => {
  chrome.runtime.sendMessage(message);
};

export const onMessage = (cb: (message?: IMessage) => void): void => {
  chrome.runtime.onMessage.addListener(cb);
};

export const to = (url: string): void => {
  void chrome.tabs.create({ url });
};
