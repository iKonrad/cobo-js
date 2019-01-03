import TypeKeys from 'state/constants/App';
import { createAction, Meta, ActionsUnion, Translations } from 'types';

export const Actions = {
  fetchTranslations: (code: string) => createAction(
    TypeKeys.FETCH_TRANSLATIONS,
    { code },
    { thunk: true },
  ),
  fetchTranslationsSuccess: (data: Translations, meta: Meta) => createAction(
    TypeKeys.FETCH_TRANSLATIONS_SUCCESS,
    data,
    meta,
  ),
  fetchTranslationsFailure: (meta: Meta) => createAction(
    TypeKeys.FETCH_TRANSLATIONS_FAILURE,
    meta,
  ),
  startLoading: (processId: string, loadingText?: string) => createAction(
    TypeKeys.START_LOADING,
    {
      text: loadingText,
      processId,
    },
  ),
  stopLoading: (processId: string) => createAction(
    TypeKeys.STOP_LOADING,
    { processId },
  ),
  showMobileMenu: () => createAction(
    TypeKeys.SHOW_MOBILE_MENU,
  ),
  hideMobileMenu: () => createAction(
    TypeKeys.HIDE_MOBILE_MENU,
  ),
};

export type Actions = ActionsUnion<typeof Actions>;
