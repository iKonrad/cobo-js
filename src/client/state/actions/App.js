import * as Constants from '../constants/App';

export const fetchTranslations = (code) => ({
  type: Constants.FETCH_TRANSLATIONS,
  code,
  meta: {
    thunk: true,
  }
});

export const fetchTranslationsSuccess = (data, meta) => ({
  type: Constants.FETCH_TRANSLATIONS_SUCCESS,
  payload: data,
  meta,
})

export const fetchTranslationsFailure = (meta) => ({
  type: Constants.FETCH_TRANSLATIONS_FAILURE,
  meta,
})

export const startLoading = (processId, loadingText) => ({
    type: Constants.START_LOADING,
    text: loadingText,
    processId,
})

export const stopLoading = (processId) => ({
  type: Constants.STOP_LOADING,
  processId,
})

export const showMobileMenu = () => ({
  type: Constants.SHOW_MOBILE_MENU,
})

export const hideMobileMenu = () => ({
  type: Constants.HIDE_MOBILE_MENU,
})
