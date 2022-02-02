import { Color } from '@material-ui/lab';
import { TAction } from 'store';
import actionTypes from 'actions/types';

type alertOrigin = 'top-center'|'top-right'|'top-left'|'bottom-center'|'bottom-right'|'bottom-left';

export interface IAlertPayload {
    message: string,
    severity?: Color,
    color?: Color
    anchorOrigin?: alertOrigin,
    autoHide?: boolean,
};

export interface IAlertInfo extends IAlertPayload {
    readonly key: number
}

export type TAlertReducerState = Array<IAlertInfo>

export type TAlertActions = TAction<actionTypes.SHOW_ALERT, IAlertPayload> | TAction<actionTypes.CLOSE_ALERT>

export default function alertReducer (state: TAlertReducerState = [] , action: TAlertActions): TAlertReducerState {
    switch(action.type) {
        case actionTypes.SHOW_ALERT:
            return [...state, { ...action.payload, key: new Date().getTime() }];
        case actionTypes.CLOSE_ALERT:
            return state.slice(1);
        default:
            return state;
    }
}