import alertReducer from 'reducers/slices/alertReducer';
import actionTypes from "actions/types";
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from "redux"
import userReducer from "./slices/userReducer";
import dialogReducer from './slices/dialogReducer';
import newsReducer from './slices/newsReducer';

// combined redecucers (Root Reducer)
const AppReducer = combineReducers ({
    form: formReducer,
    user: userReducer,
    alert: alertReducer,
    dialog: dialogReducer,
    news: newsReducer,
});

// when user logges out store will be cleaned up
// const RootReducer: typeof AppReducer = (state , action) => {   
//     if(action.type === actionTypes.LOGOUT) {
//         return AppReducer(undefined, action);
//     }
//     return AppReducer(state, action);
// };

export default AppReducer;