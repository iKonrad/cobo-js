import * as Constants from 'state/constants/App';

export const defaultState = {
  translations: {},
  loading: {
    on: false,
    processes: [],
    text: '',
  },
  showMenu: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case Constants.FETCH_TRANSLATIONS_SUCCESS: {
      return {
        ...state,
        translations: action.payload,
      }
    }
    case Constants.FETCH_TRANSLATIONS_FAILURE: {
      return {
        ...state,
        translations: {},
      }
    }
    case Constants.START_LOADING: {
      const processes = [...state.loading.processes];
      processes.push(action.processId);
      return {
        ...state,
        loading: {
          on: true,
          processes,
          text: action.text,
        }
      }
    }
    case Constants.STOP_LOADING: {
      const filteredProcesses = state.loading.processes.filter(i => i !== action.processId);
      return {
        ...state,
        loading: {
          on: filteredProcesses.length > 0,
          text: '',
          processes: filteredProcesses
        }
      }
    }
    case Constants.SHOW_MOBILE_MENU: {
      return {
        ...state,
        showMenu: true,
      }
    }
    case Constants.HIDE_MOBILE_MENU: {
      return {
        ...state,
        showMenu: false,
      }
    }
  }
  return state;
}
