import { APP_GET_LANGUAGE, 
    MAKE_LOGOUT, 
    MAKE_LOGIN, 
    RESET_LOGIN_STATUS, 
    START_SERVER_COMUNICATION, 
    END_SERVER_COMUNICATION, 
    SERVER_COMUNICATION_FAIL, 
    RESET_SERVER_ERROR } from '../actionTypes';
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
import { 
    enCode, 
    ptCode, 
    currentLanguage,
    checkLogin,
    getCurrentUser,    
    results,
    LOAD_LOGIN_MENU,
    LOAD_NEW_COMMENT,
    LOAD_HOME_NEWS} from '../../settings';
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
            isPageLoading: false,
            localLoading: {
                loadComment: false,
                loadLogin: false,
                loadHomeNews: false
            }
        }
    } 
}

function getLoadingState(isLocalLoading: boolean, pageLoading: ILoading, loadLocalization: string)
{
    let loading: ILoading = {
        isPageLoading: isLocalLoading ? pageLoading.isPageLoading : true,
        localLoading: {
            loadLogin: isLocalLoading  && loadLocalization === LOAD_LOGIN_MENU ? true : pageLoading.localLoading.loadLogin,
            loadComment: isLocalLoading  && loadLocalization === LOAD_NEW_COMMENT ? true : pageLoading.localLoading.loadComment,
            loadHomeNews: isLocalLoading  && loadLocalization === LOAD_HOME_NEWS ? true : pageLoading.localLoading.loadHomeNews
        }        
    }
    return {...loading};
}

function endLoadingState(isLocalLoading: boolean, pageLoading: ILoading, loadLocalization: string)
{
    let loading: ILoading = {
        isPageLoading: isLocalLoading ? pageLoading.isPageLoading : false,
        localLoading: {
            loadLogin: (isLocalLoading  && loadLocalization === LOAD_LOGIN_MENU) ? false : pageLoading.localLoading.loadLogin,
            loadComment: (isLocalLoading  && loadLocalization === LOAD_NEW_COMMENT) ? false : pageLoading.localLoading.loadComment,
            loadHomeNews: (isLocalLoading  && loadLocalization === LOAD_HOME_NEWS) ? false : pageLoading.localLoading.loadHomeNews
        }
    }
    return {...loading};
}

export function appSettings(state:IAppSettings = defaultState, action:IappAction) {

    switch (action.type) {
        case APP_GET_LANGUAGE: {
            if ( action.payload.language === enCode )
            {
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
        case START_SERVER_COMUNICATION: {
            let loadingData = getLoadingState( action.payload.isLocalized, {...state.fetchData.loading}, action.payload.loadLocalization );
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
            let loadingData = endLoadingState( action.payload.isLocalized, {...state.fetchData.loading}, action.payload.loadLocalization );
            let fetchDataState = {
                    loading : loadingData,            
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