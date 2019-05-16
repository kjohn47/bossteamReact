import { APP_GET_LANGUAGE, MAKE_LOGOUT, MAKE_LOGIN, RESET_LOGIN_STATUS } from '../actionTypes';
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
    results} from '../../settings';
import {tempUser} from '../../pageData/mock/user';

const defaultState: IAppSettings = {
    menuText : defaultMenuText,
    newsLanguage: defaultNewsText,
    addCommentText: defaultAddCommentText,
    commentText: defaultCommentText,
    loginForm: defaultLoginForm,
    presentationLanguage: currentLanguage(),
    isLogged: checkLogin(),
    loggedUser: getCurrentUser(),
    tryLogin: results.default
}

function makeLoginOnServer( user: string, password: string ){
    if( user === "abc" && password === "123")////To replace with server call -- mock abc/123
    {
        return tempUser;
    }
    return false;
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
            let loggedUser = makeLoginOnServer( action.payload.user, action.payload.password );
            if( !loggedUser )
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

    default: 
            return state;
    }
}