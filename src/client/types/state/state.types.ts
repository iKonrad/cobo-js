
export interface UserDataState {
    email: string,
}

export interface UserState {
    authenticated: boolean,
    sessionToken: string|null,
    data: UserDataState|null,
}

export interface Translations {
    [id: string]: string,
}

export interface Loading {
    on: boolean,
    processes: string[],
    text: string|null,
}

export interface AppState {
    translations: Translations,
    loading: Loading,
    showMenu: boolean,
}

export interface State {
    user: UserState,
    app: AppState,
    form: object,
}
