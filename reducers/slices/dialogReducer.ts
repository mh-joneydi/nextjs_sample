import { BtnColor } from 'components/customized/Btn';
import actionTypes from 'actions/types';
import { TAction } from 'store';

export interface IDialogPayload {
    title?: string,
    body?: string | React.ReactElement,
    noAction?: boolean,
    okText?: string,
    cancelText?: string,
    onOk?: Function,
    onCancel?: Function,
    okColor?: BtnColor,
    cancelColor?: BtnColor
};

export interface IDialogInfo extends IDialogPayload {
    readonly key: number
}

export type TDialogPack = Array<IDialogInfo>

interface IDialogReducerState {
    dialogPack: TDialogPack,
    open: boolean
}

const initialState: IDialogReducerState = {
    dialogPack: [],
    open: false
}

type TDialogActions = TAction<actionTypes.OPEN_DIALOG, IDialogPayload> | TAction<actionTypes.CLEAR_DIALOG_PACK> | TAction<actionTypes.CLOSE_DIALOG>

export default function dialogReducer(state = initialState , action: TDialogActions ) {
    switch(action.type) {
        case actionTypes.OPEN_DIALOG:
            return {
                ...state,
                dialogPack: [ ...state.dialogPack, { ...action.payload, key: new Date().getTime() } ]
            };
        case actionTypes.CLEAR_DIALOG_PACK:
            return {
                open: true,
                dialogPack: state.dialogPack.slice(1)
            }
        case actionTypes.CLOSE_DIALOG:
            return {
                ...state,
                open: false
            };
        default:
            return state;
    }
}
