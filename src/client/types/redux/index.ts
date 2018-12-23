import * as User from './states/User.state.types';
import * as App from './states/App.state.types';

export interface State {
    user: User.UserState,
    app: App.AppState,
    form: object,
}

export * from './states/User.state.types';
export * from './states/App.state.types';
export * from './sagas.types';
export * from './actions.types';
