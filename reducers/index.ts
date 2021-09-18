import alertReducer from 'reducers/slices/alertReducer';
import actionTypes from "actions/types";
import { combineReducers } from "redux"
import userReducer from "./slices/userReducer";

// combined redecucers (Root Reducer)
const AppReducer = combineReducers ({
    user: userReducer,
    alert: alertReducer
});

// when user logges out store will be cleaned up
const RootReducer: typeof AppReducer = (state , action) => {   
    if(action.type === actionTypes.LOGOUT) {
        return AppReducer(undefined, action);
    }
    return AppReducer(state, action);
};

export default RootReducer;