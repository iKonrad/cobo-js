import api from 'utils/ApiClient';
import Cookies from 'utils/Cookies';
import settings from 'settings';

export const authenticate = async (email: string, password: string) => {
  try {
    const { data } = await api.request({
      url: '/auth',
      method: 'post',
      headers: {
        'Accept-Language': 'pl-PL',
      },
      data: {
        email,
        password,
      },
    });

    if (data.sessionToken) {
      // Save session token in a cookie
      Cookies.setCookie(settings.AUTH_COOKIE_NAME, data.sessionToken);
      return data;
    }

    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const logout = async () => {
  try {
    const { data } = await api.post('/logout', null, {
      headers: {
        'Accept-Language': 'pl-PL',
      },
    });
    Cookies.eraseCookie(settings.AUTH_COOKIE_NAME);
    return data.success;
  } catch (e) {
    return false;
  }
};

export const signup = async payload => {
  try {
    const { data } = await api.request({
      url: '/users',
      method: 'post',
      data: payload,
      headers: {
        'Accept-Language': 'pl-PL',
      },
    });

    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const getUserData = async sessionToken => {
  try {
    const response = await api.request({
      url: '/me',
      method: 'get',
      headers: {
        'Accept-Language': 'pl-PL',
        Authorization: `Bearer ${sessionToken}`,
      },
    });
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};
