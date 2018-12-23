export interface Action {
  type: string,
}

export interface ActionAsync {
  type: string,
  meta: object,
}

export interface ActionAsyncPayload {
  type: string,
  payload: object,
  meta: object,
}

export interface ActionWithToken {
  type: string,
  sessionToken: string,
  meta: object,
}
