import axios from 'axios';
import { ABORT_TIMEOUT } from './config';

const timeout = function (controller) {
  setTimeout(() => {
    controller.abort();
  }, ABORT_TIMEOUT * 1000);
};

export const getRequest = async url => {
  const controller = new AbortController();
  const { signal } = controller;

  timeout(controller);

  try {
    const response = await axios.get(url, { signal });
    return response;
  } catch (err) {
    throw err;
  }
};

export const postRequest = async (url, data) => {
  const controller = new AbortController();
  const { signal } = controller;

  timeout(controller);

  try {
    const response = await axios({
      method: 'post',
      url: url,
      data: data,
      signal,
    });
    return response;
  } catch (err) {
    throw err;
  }
};
