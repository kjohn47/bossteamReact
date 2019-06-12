import { IMyAccountReduxState, IMyAccountAction, IMyAccountChangeNamePayload } from "../../interfaces/myAccount";
import { results, checkLogin, getCurrentUser } from "../../settings";
import { MAKE_LOGOUT, MAKE_LOGIN, RESET_LOGIN_STATUS, RESET_MYACCOUNT_STATUS, CHANGE_MYACCOUNT_NAME } from "../actionTypes";

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

        case RESET_MYACCOUNT_STATUS: {              
            return {...state,
                changeName: {...state.changeName,
                    success: results.default
                },
                changePassword: {...state.changePassword,
                    success: results.default
                },
                closeAccount: {...state.closeAccount,
                    success: results.default
                }
            };
        }

        case CHANGE_MYACCOUNT_NAME: {            
            let nameData: IMyAccountChangeNamePayload = {
                name: state.loggedUser.name,
                surname: state.loggedUser.surname
            };

            if( action.payload.changeName !== null && action.payload.changeName !== undefined )
            {
                nameData = {
                    name: action.payload.changeName.name,
                    surname: action.payload.changeName.surname
                }
            }

            return {...state,
                changeName: {...state.changeName,
                    success: action.payload.success                
                },
                loggedUser: {...state.loggedUser,
                    name: nameData.name,
                    surname: nameData.surname
                }
            };
        }

        default: 
        {
            return state;
        }
    }
}