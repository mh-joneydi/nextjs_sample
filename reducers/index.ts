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

// When the user is logged out store will be cleaned up
// const RootReducer: typeof AppReducer = (state: any , action) => {   

//     // "news" is Home page state that we want to save them from reset stroe when user was logged out
//     if(action.type === actionTypes.LOGOUT) {
//         const { news } = state;
//         state = { news };
//     }
//     return AppReducer(state, action);
// };

export default AppReducer;