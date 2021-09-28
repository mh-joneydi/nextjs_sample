import { IDialogPayload } from 'reducers/slices/dialogReducer';
import { AppDispatch, TActionCreator } from 'store';
import actionTypes from 'actions/types';
import { IAlertPayload } from 'reducers/slices/alertReducer';
import { ILoginFormValues } from 'components/LoginForm';
import APICall from 'lib/api';
import { IUserInfo } from 'reducers/slices/userReducer';
import { setCookie } from 'lib/functions';
import globalStorage from 'lib/globalStorage';
import Router from 'next/router'

/******* Alert Action *******/

export const showAlert = (options: IAlertPayload): TActionCreator => ({
    type: actionTypes.SHOW_ALERT,
    payload: options
});

export const closeAlert = (): TActionCreator=> ({ type: actionTypes.CLOSE_ALERT });

/******* Alert Action *******/

/******* Dialog Action *******/

export const openDialog = (options: IDialogPayload): TActionCreator => ({
    type: actionTypes.OPEN_DIALOG,
    payload: options
});

export const clearDialogPack = (): TActionCreator => ({ type: actionTypes.CLEAR_DIALOG_PACK });
export const closeDialog = (): TActionCreator=> ({ type: actionTypes.CLOSE_DIALOG });

/******* Dialog Action *******/


/******* User Action *******/

export const login = (loginFormValues: ILoginFormValues) => async(dispatch: AppDispatch) => {
    const {data: { result: Token } } = await APICall<string>({ 
        url: '/Account/Login',
        method: 'POST',
        data: {
            phoneNumber: loginFormValues.username,
            password: loginFormValues.password,
        }
    });
    const {data: { result: UserInfo } } = await APICall<IUserInfo>({ 
        method: 'GET',
        url: '/Account/GetProfile',
        headers: { Token } 
    });
    const _expireDays = loginFormValues.remember ? 5 : 1;
    globalStorage.setItem('USER_TOKEN', Token, _expireDays);
    globalStorage.setItem('USER_INFO', UserInfo);
    dispatch({
        type: actionTypes.LOGIN,
        payload: UserInfo
    });
}

export const logout = ()=> (dispatch: AppDispatch)=> {
    dispatch(openDialog({
        title: 'خروج',
        body: 'آیا می خواهید از حساب کاربری خود خارج شوید؟',
        onOk: ()=> {
            APICall({
                method: 'GET',
                url: '/Account/Logout',
            })
            dispatch({ type: actionTypes.LOGOUT })
            globalStorage.clear();
            Router.push('/');
        },
        okText: 'بله', 
    }))
    
}

/******* User Action *******/