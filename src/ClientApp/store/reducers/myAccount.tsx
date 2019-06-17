import { IMyAccountReduxState, IMyAccountAction, IMyAccountChangeNamePayload } from "../../interfaces/myAccount";
import { results, checkLogin, getCurrentUser } from "../../settings";
import { 
    MAKE_LOGOUT,
    MAKE_LOGIN,
    RESET_LOGIN_STATUS,
    RESET_MYACCOUNT_STATUS,
    CHANGE_MYACCOUNT_NAME,
    MYACCOUNT_CHECK_OLD_PASSWORD,
    MYACCOUNT_CHANGE_PASSWORD,
    MYACCOUNT_CHECK_PASSWORD, 
    MYACCOUNT_CHECK_EMAIL,
    RESET_MYACCOUNT_SUCCSESS,
    MYACCOUNT_CLOSE_ACCOUNT,
    MYACCOUNT_ENABLE_ACCOUNT
} from "../actionTypes";

//// -- Default myAccount state
const defaultState: IMyAccountReduxState = {
    isLogged: checkLogin(),
    loggedUser: getCurrentUser(),
    tryLogin: results.default,
    changeName: {
        success: results.default
    },
    changePassword: {
        success: results.default,
        wrongOldPassword: false,
        validOldPassword: false
    },
    closeAccount: {
        success: results.default,
        wrongEmail: false,
        validEmail: false,
        validPassword: false,
        wrongPassword: false
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
                changePassword: {...state.changePassword,
                    validOldPassword: false,
                    wrongOldPassword: false
                },
                closeAccount: {...state.closeAccount,
                    wrongEmail: false,
                    validEmail: false,
                    validPassword: false,
                    wrongPassword: false
                }
            };
        }

        case RESET_MYACCOUNT_SUCCSESS: {
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

        case MYACCOUNT_CHECK_OLD_PASSWORD: {
            return { ...state,
                changePassword: { ...state.changePassword,
                    validOldPassword: action.payload.changePassword.validPassword,
                    wrongOldPassword: action.payload.changePassword.wrongPassword
                }
            }
        }

        case MYACCOUNT_CHANGE_PASSWORD: {
            return { ...state,
                changePassword: {
                    success: action.payload.success,
                    validOldPassword: action.payload.changePassword.validPassword,
                    wrongOldPassword: action.payload.changePassword.wrongPassword
                }
            }
        }

        case MYACCOUNT_CHECK_PASSWORD: {
            return { ...state,
                closeAccount: { ...state.closeAccount,
                    wrongPassword: action.payload.closeAccount.wrongPassword,
                    validPassword: action.payload.closeAccount.validPassword
                }
            }
        }

        case MYACCOUNT_CHECK_EMAIL: {
            return { ...state,
                closeAccount: { ...state.closeAccount,
                    wrongEmail: action.payload.closeAccount.wrongEmail,
                    validEmail: action.payload.closeAccount.validEmail
                }
            }
        }

        case MYACCOUNT_ENABLE_ACCOUNT: {
            return {...state,
                loggedUser: { ...state.loggedUser,
                    enabled: action.payload.enabled
                }
            }
        }

        case MYACCOUNT_CLOSE_ACCOUNT: {
            return {...state,
                closeAccount: {
                    success: action.payload.success,
                    validEmail: action.payload.closeAccount.validEmail,
                    validPassword: action.payload.closeAccount.validPassword,
                    wrongEmail: action.payload.closeAccount.wrongEmail,
                    wrongPassword: action.payload.closeAccount.wrongPassword
                }
            };
        }

        default: 
        {
            return state;
        }
    }
}