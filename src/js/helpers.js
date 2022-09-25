import axios from 'axios';
import { ABORT_TIMEOUT } from './config';

const timeout = function (sec, controller) {
  setTimeout(() => {
    controller.abort();
  }, sec * 1000);
};

export const getRequest = async url => {
  const controller = new AbortController();
  const { signal } = controller;

  timeout(ABORT_TIMEOUT, controller);

  try {
    const response = await axios.get(url, { signal });
    return response;
  } catch (err) {
    throw err;
  }
};
