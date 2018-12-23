import { AxiosInstance } from 'axios';

export interface ApiClientInterface {
    baseUrl: string,
    session: AxiosInstance,
}
