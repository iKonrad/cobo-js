
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
