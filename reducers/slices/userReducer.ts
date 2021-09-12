import { Action } from 'store';
import actionTypes from 'actions/types';

interface IUserInfo {
    Name: string,
    UserName: string,
    ImageName: string | null,
}


interface IUserReducerState {
    isLogin: boolean,
    userInfo: IUserInfo | null
}


export interface IUserLoginPayload {
    userInfo?: IUserInfo
}

const initialState: IUserReducerState = {
    isLogin: false,
    userInfo: null
}

type TUserReducerActions = Action<actionTypes.LOGIN, IUserLoginPayload> | Action<actionTypes.LOGOUT>;

export default function userReducer(state = initialState , action: TUserReducerActions) {
    switch(action.type) {
        case actionTypes.LOGIN:
            return { 
                isLogin: true,
                ...action.payload 
            };
        case actionTypes.LOGOUT:
            return initialState;
        default:
            return state;
    }
}