import axios from "axios";
import settings from 'settings';


class ApiClient {
  constructor() {
    let baseUrl = SERVER ? settings.API_URL : settings.BASE_URL + 'api/';

    this.session = axios.create({
      baseURL: baseUrl,
      includeCredentials: !SERVER,
    });
  }
  get = async (...params) => {
    return this.session.get(...params)
  };
  post = async (...params) => this.session.post(...params);
  put = async (...params) => this.session.put(...params);
  patch = async (...params) => this.session.patch(...params);
  remove = async (...params) => this.session.delete(...params);
  call = async (...params) => {
    return this.session(...params);
  };
}


export default new ApiClient();

