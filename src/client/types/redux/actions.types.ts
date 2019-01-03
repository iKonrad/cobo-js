
export interface Meta {
  thunk: boolean,
}

export interface Error {
  [id: string]: 'string',
}

export interface Action<T extends string> {
  type: T,
}

export interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P,
  meta: P,
}

export interface ActionWithMeta<T extends string, M extends Meta> extends Action<T> {
  meta: M,
}

export interface FullAction<T extends string, P, M extends Meta> extends Action<T> {
  payload: P,
  meta: M,
}

type FunctionType = (...args: any[]) => any;
type ActionCreatorsMapObject = { [actionCreator: string]: FunctionType };
export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;

export interface ActionType {
  type: string,
  payload: any,
  meta: any,
}

export function createAction<T extends string>(type: T): Action<T>
export function createAction<T extends string, M extends Meta>(type: T, meta: M): ActionWithMeta<T, M>
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>
export function createAction<T extends string, P, M extends Meta>(type: T, payload: P, meta: M): FullAction<T, P, M>
export function createAction<T extends string, P, M extends Meta>(type: T, payload?: P, meta?:M) {
  if (!payload && !meta) {
    return { type };
  }

  if (payload && !meta) {
    return {
      type,
      payload,
    };
  }

  if (!payload && meta) {
    return {
      type,
      meta,
    };
  }

  return {
    type,
    payload,
    meta,
  };
}
