const URL = 'http://localhost:3001';

const getErrorMessage = async (response) => {
  try {
    const data = await response.json();
    return data?.error || response.statusText || 'Unknown error';
  } catch {
    return response.statusText || 'Unknown error';
  }
};

const sendRequest = async (path, method = 'GET', body) => {
  const options = {
    method,
    headers: {},
  };
  if (body !== undefined) {
    options.body = JSON.stringify(body);
    options.headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(URL + path, options).catch(() => {
    throw new Error('Network error');
  });

  if (!response.ok) {
    const errorMessage = await getErrorMessage(response);
    throw new Error(`Request failed (${response.status}): ${errorMessage}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }
  return Promise.resolve();
};

export const get = (url, body) => sendRequest(url, 'GET', body);
export const post = (url, body) => sendRequest(url, 'POST', body);
export const put = (url, body) => sendRequest(url, 'PUT', body);
export const del = (url, body) => sendRequest(url, 'DELETE', body);
export { sendRequest };