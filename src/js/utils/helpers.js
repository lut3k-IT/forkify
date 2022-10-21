import axios from 'axios';
import { ABORT_TIMEOUT } from './config';

//TODO: zrobić axios instance https://axios-http.com/docs/config_defaults
//TODO: zrobić to lepiej, jako 1 funkcję czy coś (requesty)

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

export const postRequest = async (url, data) => {
  const controller = new AbortController();
  const { signal } = controller;

  timeout(ABORT_TIMEOUT, controller);

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
