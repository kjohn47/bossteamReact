import { APP_GET_LANGUAGE, 
    MAKE_LOGOUT, 
    MAKE_LOGIN, 
    RESET_LOGIN_STATUS, 
    START_SERVER_COMUNICATION, 
    END_SERVER_COMUNICATION, 
    SERVER_COMUNICATION_FAIL, 
    RESET_SERVER_ERROR } from '../actionTypes';
import { IappAction, IAppSettings, IFetchData } from '../../interfaces/appSettings';
import { TEXT_MENU } from '../../pageData/language/menu';
import { TEXT_NEWS_LIST } from '../../pageData/language/news';
import { TEXT_LOGIN_MENU, TEXT_NEED_LOGIN } from '../../pageData/language/login';
import { TEXT_COMMENT, TEXT_COMMENT_ADD} from '../../pageData/language/comment';
import { 
    enCode, 
    ptCode, 
    currentLanguage,
    checkLogin,
    getCurrentUser,    
    results,
    LOAD_LOGIN_MENU,
    LOAD_NEW_COMMENT,
    LOAD_HOME_NEWS,
    Show_Error_Detailed,
    GetPropertyValue} from '../../settings';
import { ILoading, IErrorHandling, IErrorHandlingText, IErrorHandlingTextTranslation } from '../../interfaces/common';
import { ERRORS, TEXT_PAGE_NOT_FOUND } from '../../pageData/language/errors';

const startLang = currentLanguage();

const defaultState: IAppSettings = {
    menuText : GetPropertyValue(TEXT_MENU, startLang),
    newsLanguage: GetPropertyValue(TEXT_NEWS_LIST, startLang),
    addCommentText: GetPropertyValue(TEXT_COMMENT_ADD, startLang),
    commentText: GetPropertyValue(TEXT_COMMENT, startLang),
    loginForm: GetPropertyValue(TEXT_LOGIN_MENU, startLang),
    loginFormHeader: GetPropertyValue(TEXT_NEED_LOGIN, startLang),
    pageNotFoundText: GetPropertyValue(TEXT_PAGE_NOT_FOUND, startLang),
    presentationLanguage: startLang,
    isLogged: checkLogin(),
    loggedUser: getCurrentUser(),
    tryLogin: results.default,
    fetchData: {
        error: {
            hasError: false,
            errorDescription: "",
            errorCode: "",
            errorText: null
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

function getLoadingState( isLocalLoading: boolean, pageLoading: ILoading, loadLocalization: string ) : ILoading
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

function endLoadingState( isLocalLoading: boolean, pageLoading: ILoading, loadLocalization: string ) : ILoading
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

function getTranslatedError( language: string, error: IErrorHandling ) : IErrorHandling
{
    let recievedCode = error.errorCode;
    let errorData: IErrorHandlingTextTranslation = GetPropertyValue(ERRORS, recievedCode);
    let errorText: IErrorHandlingText = null;    
    let errorNotTranslated = true;

    if (errorData !== null && errorData !== undefined)
    {
        let translatedError: IErrorHandlingText = GetPropertyValue(errorData, language);
        if (translatedError !== null && translatedError !== undefined)
        {
            errorText = {
                errorTitle: translatedError.errorTitle + ( Show_Error_Detailed ? ' [' + error.errorCode + ']' : ''),
                errorMessage: translatedError.errorMessage + ( Show_Error_Detailed ? ' [' + error.errorDescription + ']' : '')
            }
            errorNotTranslated = false;
        }        
    }

    if( Show_Error_Detailed && errorNotTranslated )
    {
        errorText = {
            errorTitle: '[' + error.errorCode + ']',
            errorMessage: '[' + error.errorDescription + ']'
        }
    }

    let errorOut: IErrorHandling = {
        errorCode: error.errorCode,
        errorDescription: error.errorDescription,
        hasError: error.hasError,
        errorText: errorText
    }

    return errorOut;
}

export function appSettings(state:IAppSettings = defaultState, action:IappAction) : IAppSettings {

    switch (action.type) {
        case APP_GET_LANGUAGE: {            
            let errorData: IErrorHandling = {...state.fetchData.error}
            if( state.fetchData.error.hasError )
            {
                errorData = getTranslatedError(action.payload.language, {...state.fetchData.error});
            }
            let lang = action.payload.language;
            if(lang !== ptCode && lang !== enCode)
            {
                lang = ptCode;
            }
            return {...state, 
                menuText: GetPropertyValue(TEXT_MENU, lang),
                newsLanguage: GetPropertyValue(TEXT_NEWS_LIST, lang),
                addCommentText: GetPropertyValue(TEXT_COMMENT_ADD, lang),
                commentText: GetPropertyValue(TEXT_COMMENT, lang),
                loginFormHeader: GetPropertyValue(TEXT_NEED_LOGIN, lang),
                loginForm: GetPropertyValue(TEXT_LOGIN_MENU, lang),
                pageNotFoundText: GetPropertyValue(TEXT_PAGE_NOT_FOUND, lang),
                presentationLanguage: lang,                
                fetchData: {...state.fetchData, 
                    error: errorData
                }        
            };
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
            let fetchDataState: IFetchData = {
                loading : loadingData,
                error: {
                    hasError: false,
                    errorDescription: "",
                    errorCode: "",
                    errorText: null
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
            let fetchDataState: IFetchData = {...state.fetchData};
            let errorData = getTranslatedError(state.presentationLanguage, action.payload.error);
            fetchDataState = {
                loading: {...state.fetchData.loading},
                error: errorData
            };
            return{...state,
                fetchData: fetchDataState
            }
        }
        case RESET_SERVER_ERROR: {
            let fetchDataState: IFetchData = {...state.fetchData};
            fetchDataState = {
                loading: {...state.fetchData.loading},
                error: {
                    hasError: false,
                    errorDescription: "",
                    errorCode: "",
                    errorText: null
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