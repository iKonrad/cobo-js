import axios, { AxiosInstance } from 'axios';
import settings from 'settings';
import { ApiClientInterface } from 'types';

class ApiClient implements ApiClientInterface {
  baseUrl: string;

  session: AxiosInstance;

  constructor() {
    this.baseUrl = SERVER ? settings.API_URL : `${settings.BASE_URL}api/`;
    this.session = axios.create({
      baseURL: this.baseUrl,
      withCredentials: !SERVER,
    });
  }

  // @ts-ignore
  get = async (...params) => this.session.get(...params);

  // @ts-ignore
  post = async (...params) => this.session.post(...params);

  // @ts-ignore
  put = async (...params) => this.session.put(...params);

  // @ts-ignore
  patch = async (...params) => this.session.patch(...params);

  // @ts-ignore
  remove = async (...params) => this.session.delete(...params);

  // @ts-ignore
  call = async (...params) => this.session(...params);
}

export default new ApiClient();
