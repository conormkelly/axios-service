const axios = require('axios');

/**
 * Make a HTTP GET request.
 *
 * ```js
 * // Example usage:
 * const response = await httpService.get('https://my-api.com/users');
 *
 * if (response.error) {
 *   logger.error(`Something descriptive: ${err.name} - ${err.message}`);
 *   // handle failure accordingly
 * }
 *
 * // At this point, we know these properties are valued
 * const { statusCode, body, headers } = response;
 *
 * // but we still need to check for non-200 statusCode / empty body etc
 * ```
 *
 * @param {string} url
 * @param {{headers: object}} config
 * @returns {{body: object, statusCode: number, headers: object} | {error: any}} response
 */
exports.get = async (url, config) => {
  try {
    // Safely extract options from the config (if it was passed)
    const requestHeaders = config ? config.headers : undefined;

    // Send the request
    const response = await axios({
      method: 'get',
      url,
      headers: requestHeaders,
    });

    // Success case
    return {
      statusCode: response.status,
      headers: response.headers,
      body: response.data,
    };
    // Error case
  } catch (err) {
    // Axios throws an error if non-200 status code
    if (err.isAxiosError && err.response) {
      // It could have a statusCode of 500 for example and still have a response body,
      // so as long as we received a response, we won't consider this an exception
      return {
        statusCode: err.response.status,
        headers: err.response.headers,
        body: err.response.data,
      };
    } else {
      // This error could be, for example, a HTTP timeout OR even a non-HTTP error
      // So it should be checked and handled accordingly by the calling code
      return { error: err };
    }
  }
};

/**
 * Make a HTTP POST request.
 *
 * ```js
 * // Example usage:
 * const response = await httpService.post('https://my-api.com/users', {
 *   body: { firstName: 'Bob' },
 * });
 *
 * if (response.error) {
 *   logger.error(`Something descriptive: ${err.name} - ${err.message}`);
 *   // handle failure accordingly
 * }
 *
 * // At this point, we know these properties are valued
 * const { statusCode, body, headers } = response;
 *
 * // but we still need to check for non-200 statusCode / empty body etc
 * ```
 *
 * @param {string} url
 * @param {{body: object, headers: object}} config
 * @returns {{body: any, statusCode: number, headers: object} | {error: any}} response
 */
exports.post = async (url, config) => {
  try {
    // Safely extract options from the config (if it was passed)
    const data = config ? config.body : undefined;
    const headers = config ? config.headers : undefined;

    // Send the request
    const response = await axios({
      method: 'post',
      url,
      data,
      headers,
    });

    // Success case
    return {
      statusCode: response.status,
      headers: response.headers,
      body: response.data,
    };
    // Error case
  } catch (err) {
    // Axios throws an error if non-200 status code
    if (err.isAxiosError && err.response) {
      // It could have a statusCode of 500 for example and still have a response body,
      // so as long as we received a response, we won't consider this an exception
      return {
        statusCode: err.response.status,
        headers: err.response.headers,
        body: err.response.data,
      };
    } else {
      // This error could be, for example, a HTTP timeout OR even a non-HTTP error
      // So it should be checked and handled accordingly by the calling code
      return { error: err };
    }
  }
};
