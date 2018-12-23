export interface UserDataState {
    email: string,
}

export interface UserState {
    authenticated: boolean,
    sessionToken: string|null,
    data: UserDataState|null,
}
