import { APP_GET_LANGUAGE, 
    START_SERVER_COMUNICATION, 
    END_SERVER_COMUNICATION, 
    SERVER_COMUNICATION_FAIL, 
    RESET_SERVER_ERROR } from '../actionTypes';
import { IappAction, IAppSettings, IFetchData } from '../../interfaces/appSettings';
import { 
    enCode, 
    ptCode, 
    Show_Error_Detailed,
    } from '../../settings';
import { ILoading, IErrorHandling, IErrorHandlingText, IErrorHandlingTextTranslation } from '../../interfaces/common';
import { ERRORS } from '../../pageData/language/errors';
import { currentLanguage } from '../../common/session';
import { GetPropertyValue } from '../../common/methods';
import { getTranslatedText } from '../../pageData/language';

const startLang = currentLanguage();

const defaultState: IAppSettings = {
    appText: getTranslatedText( startLang ),
    presentationLanguage: startLang,
    fetchData: {
        error: {
            hasError: false,
            errorDescription: "",
            errorCode: "",
            errorText: null
        },
        loading: {
            isPageLoading: false,
            localLoading: {}
        }
    } 
}

function getLoadingState( isLocalLoading: boolean, pageLoading: ILoading, loadLocalization: string, end: boolean = false ) : ILoading
{
    let loading: ILoading = {
        isPageLoading: isLocalLoading ? pageLoading.isPageLoading : !end,
        localLoading: isLocalLoading ? 
            { ...pageLoading.localLoading,
                [loadLocalization]: !end  
            } :
            { ...pageLoading.localLoading }
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
                appText: getTranslatedText( lang ),
                presentationLanguage: lang,                
                fetchData: {...state.fetchData, 
                    error: errorData
                }        
            };
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
            let loadingData = getLoadingState( action.payload.isLocalized, {...state.fetchData.loading}, action.payload.loadLocalization, true );
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