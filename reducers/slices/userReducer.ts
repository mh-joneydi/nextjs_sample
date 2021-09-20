import { TAction } from 'store';
import actionTypes from 'actions/types';

export interface IUserInfo {
    age: string
    bio: string
    citizenCode: string
    email: string
    firstName: string
    friends: string
    imageName: string
    inventory: string
    lastName: string
    phoneNumber: string
    unreadStatements: string
    userId: string
    userName: string
}

interface IUserReducerState {
    isLogin: boolean,
    userInfo: IUserInfo | null
}

// export interface IUserLoginPayload {
//     userInfo?: IUserInfo
// }

const initialState: IUserReducerState = {
    isLogin: false,
    userInfo: null
}

type TUserReducerActions = TAction<actionTypes.LOGIN, IUserInfo> | TAction<actionTypes.LOGOUT>;

export default function userReducer(state = initialState , action: TUserReducerActions) {
    switch(action.type) {
        case actionTypes.LOGIN:
            return { 
                isLogin: true,
                userInfo: action.payload 
            };
        case actionTypes.LOGOUT:
            return initialState;
        default:
            return state;
    }
}