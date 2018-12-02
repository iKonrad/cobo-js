/**
 * Helper function that saves a cookie for a given name, value and a number of days
 * @param name
 * @param value
 * @param days
 */
const setCookie = (name, value, days) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${value || ''}${expires};path=/;`;
  return value;
};

/**
 * Returns a cookie for a given cookieString
 * (either from document.cookie or the server request context)
 * @param cookieString
 * @param name
 * @returns {*}
 */
const getCookieForString = (cookieString, name) => {
  const nameEQ = `${name}=`;
  if (cookieString) {
    const ca = cookieString.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  return null;
};

/**
 * Helper function that returns a cookie for a given name
 * @param name
 * @returns {*}
 */
const getCookie = name => getCookieForString(document.cookie, name);

/**
 * Helper function that removes a cookie for a given name
 * @param name
 */
const eraseCookie = name => {
  const date = new Date();
  document.cookie = `${name}=''; expires=${date.toUTCString()};path=/;`;
};

export default {
  setCookie,
  getCookie,
  getCookieForString,
  eraseCookie,
};

