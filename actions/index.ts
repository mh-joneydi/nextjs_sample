import { TActionCreator } from './../store';
import actionTypes from 'actions/types';
import { IAlertPayload } from 'reducers/slices/alertReducer';

/******* Alert Action *******/

export const showAlert = (options: IAlertPayload): TActionCreator => ({
    type: actionTypes.SHOW_ALERT,
    payload: options
});

export const closeAlert = (): TActionCreator=> ({ type: actionTypes.CLOSE_ALERT });

/******* Alert Action *******/