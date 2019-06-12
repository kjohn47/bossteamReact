import { IMyAccountReduxState, IMyAccountAction } from "../../interfaces/myAccount";
import { results, checkLogin, getCurrentUser } from "../../settings";
import { MAKE_LOGOUT, MAKE_LOGIN, RESET_LOGIN_STATUS } from "../actionTypes";

//// -- Default myAccount state
const defaultState: IMyAccountReduxState = {
    isLogged: checkLogin(),
    loggedUser: getCurrentUser(),
    tryLogin: results.default,
    changeName: {
        success: results.default
    },
    changePassword: {
        success: results.default
    },
    closeAccount: {
        success: results.default
    }
}

//// -- my Account Reducer

export function myAccount( state:IMyAccountReduxState = defaultState, action:IMyAccountAction ) : IMyAccountReduxState {

    switch (action.type) {
        
        case MAKE_LOGOUT: {
            return{...state,
                isLogged: false,
                loggedUser: null
            };
        }
        
        case MAKE_LOGIN: {
            return{...state,
                isLogged: action.payload.login.success,
                loggedUser: action.payload.login.user,
                tryLogin: action.payload.login.success ? results.success : results.failure
            };
        }
        
        case RESET_LOGIN_STATUS: {
            return{...state,
                tryLogin: results.default
            }
        }

        case "CHANGE_MYACCOUNT_NAME": {  
            return {...state,
                changeName: {...state.changeName,
                    success: action.payload.success
                }
            };
        }

        default: 
        {
            return state;
        }
    }
}