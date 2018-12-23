import { AnyAction } from 'redux';

export interface PayloadAsync extends AnyAction {
    meta: object,
}

export interface PayloadWithToken extends PayloadAsync {
    sessionToken: string|null,
    meta: object,
}
