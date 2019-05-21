import { APP_GET_LANGUAGE, MAKE_LOGOUT, MAKE_LOGIN, RESET_LOGIN_STATUS, START_SERVER_COMUNICATION, END_SERVER_COMUNICATION, SERVER_COMUNICATION_FAIL, RESET_SERVER_ERROR } from '../actionTypes';
import { IappAction, IAppSettings } from '../../interfaces/appSettings';
import { defaultMenuText, menuENText, menuPTText } from '../../pageData/language/menu';
import { defaultNewsText, enNewsText, ptNewsText } from '../../pageData/language/news';
import { defaultLoginForm, ptLoginForm, enLoginForm } from '../../pageData/language/login';
import { defaultAddCommentText, 
    enAddCommentText, 
    ptAddCommentText, 
    defaultCommentText,
    enCommentText,
    ptCommentText } from '../../pageData/language/comment';
import {setLanguage, 
    enCode, 
    ptCode, 
    currentLanguage,
    setCurrentUser,
    checkLogin,
    getCurrentUser,
    cookieLogout,
    results,
    LOAD_LOGIN_MENU,
    LOAD_NEW_COMMENT} from '../../settings';
import { ILoading } from '../../interfaces/common';

const defaultState: IAppSettings = {
    menuText : defaultMenuText,
    newsLanguage: defaultNewsText,
    addCommentText: defaultAddCommentText,
    commentText: defaultCommentText,
    loginForm: defaultLoginForm,
    presentationLanguage: currentLanguage(),
    isLogged: checkLogin(),
    loggedUser: getCurrentUser(),
    tryLogin: results.default,
    fetchData: {
        error: {
            hasError: false,
            errorTitle: "",
            errorMessage: ""
        },
        loading: {
            isGeneralLoading: false,
            localLoading: {
                loadComment: false,
                loadLogin: false
            }
        }
    } 
}

function getLoadingState(isLocalized: boolean, loadLocalization: string)
{
    let loading: ILoading = {
        isGeneralLoading: !isLocalized,
        localLoading: {
            loadComment: loadLocalization === LOAD_LOGIN_MENU,
            loadLogin: loadLocalization === LOAD_NEW_COMMENT
        }
    }

    return {...loading};
}

export function appSettings(state:IAppSettings = defaultState, action:IappAction) {

    switch (action.type) {
        case APP_GET_LANGUAGE: {
            if ( action.payload.language === enCode )
            {
                setLanguage(enCode);
                return {...state, 
                    menuText: menuENText,
                    newsLanguage: enNewsText,
                    addCommentText: enAddCommentText,
                    commentText: enCommentText,
                    loginForm: enLoginForm,
                    presentationLanguage: enCode                    
                };
            }
            else
            {
                setLanguage(ptCode);
                return {...state, 
                    menuText: menuPTText,
                    newsLanguage: ptNewsText,
                    addCommentText: ptAddCommentText,
                    commentText: ptCommentText,
                    loginForm: ptLoginForm,
                    presentationLanguage: ptCode
                };
            }
        }
        case MAKE_LOGOUT: {
            cookieLogout();
            return{...state,
                isLogged: false,
                loggedUser: null
            };
        }
        case MAKE_LOGIN: {
            let loggedUser = action.payload.user;
            if( !loggedUser || loggedUser === true )
            {
                return{...state,
                    isLogged: false,
                    loggedUser: null,
                    tryLogin: results.failure
                };    
            }
            setCurrentUser(loggedUser);
            return{...state,
                isLogged: true,
                loggedUser: loggedUser,
                tryLogin: results.success                
            };
        }
        case RESET_LOGIN_STATUS: {
            return{...state,
                tryLogin: results.default
            }
        }
        case START_SERVER_COMUNICATION: {
            let loadingData = getLoadingState( action.payload.isLocalized, action.payload.loadLocalization );
            let fetchDataState = {
                loading : loadingData,
                error: {
                    hasError: false,
                    errorMessage: "",
                    errorTitle: ""
                }
            };            
            return{...state,
                fetchData: fetchDataState
            }
        }

        case END_SERVER_COMUNICATION: {
            let fetchDataState = {
                loading : {
                    isGeneralLoading: false,
                    localLoading: {
                        loadComment: false,
                        loadLogin: false
                    }
                },
                error: {... state.fetchData.error}
            };  
            return{...state,
                fetchData: fetchDataState
            }
        }

        case SERVER_COMUNICATION_FAIL: {
            let fetchDataState = {...state.fetchData};
            fetchDataState = {
                loading: {...state.fetchData.loading},
                error: action.payload.error
            };
            return{...state,
                fetchData: fetchDataState
            }
        }
        case RESET_SERVER_ERROR: {
            let fetchDataState = {...state.fetchData};
            fetchDataState = {
                loading: {...state.fetchData.loading},
                error: {
                    hasError: false,
                    errorMessage: "",
                    errorTitle: ""
                }
            };
            return{...state,
                fetchData: fetchDataState
            }
        }

    default: 
            return state;
    }
}