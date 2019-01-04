import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import settings from 'settings';

class ApiClient {
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
  get = async (url: string, config?: AxiosRequestConfig) => this.session.get(url, config);

  post = async (url: string, data?: any, config?: AxiosRequestConfig) => this.session.post(url, data, config);

  put = async (url: string, data?: any, config?: AxiosRequestConfig) => this.session.put(url, data, config);

  patch = async (url: string, data?: any, config?: AxiosRequestConfig) => this.session.patch(url, data, config);

  remove = async (url: string, config?: AxiosRequestConfig) => this.session.delete(url, config);

  request = async (config: AxiosRequestConfig) => this.session.request(config);
}

export default new ApiClient();
