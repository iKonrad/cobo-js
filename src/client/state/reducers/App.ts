import TypeKeys from 'state/constants/App';
import { AppState } from 'types';
import { Actions } from 'state/actions/App';

export const defaultState: AppState = {
  translations: {},
  loading: {
    on: false,
    processes: [],
    text: '',
  },
  showMenu: false,
};

export default (state: AppState = defaultState, action: Actions): AppState => {
  switch (action.type) {
    case TypeKeys.FETCH_TRANSLATIONS_SUCCESS: {
      return {
        ...state,
        translations: action.payload,
      };
    }
    case TypeKeys.FETCH_TRANSLATIONS_FAILURE: {
      return {
        ...state,
        translations: {},
      };
    }
    case TypeKeys.START_LOADING: {
      const processes = [...state.loading.processes];
      processes.push(action.payload.processId);
      return {
        ...state,
        loading: {
          on: true,
          processes,
          text: action.payload.text,
        },
      };
    }
    case TypeKeys.STOP_LOADING: {
      const filteredProcesses = state.loading.processes.filter(i => i !== action.payload.processId);
      return {
        ...state,
        loading: {
          on: filteredProcesses.length > 0,
          text: '',
          processes: filteredProcesses,
        },
      };
    }
    case TypeKeys.SHOW_MOBILE_MENU: {
      return {
        ...state,
        showMenu: true,
      };
    }
    case TypeKeys.HIDE_MOBILE_MENU: {
      return {
        ...state,
        showMenu: false,
      };
    }
    default:
      return state;
  }
};
