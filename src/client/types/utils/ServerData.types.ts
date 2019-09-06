import * as Redux from 'redux';
import { State } from 'src/client/types';
import { RouteComponentProps } from 'react-router';
import { Context } from 'koa';

export interface ServerData {
}

export type LoadDataFunction = (store: Redux.Store<State>, route: any, match: RouteComponentProps<any>, ctx: Context) => Promise<ServerData>;
