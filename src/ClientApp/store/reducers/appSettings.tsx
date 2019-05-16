import { APP_GET_LANGUAGE, MAKE_LOGOUT, MAKE_LOGIN } from '../actionTypes';
import { IappAction, IAppSettings } from '../../interfaces/appSettings';
import { defaultMenuText, menuENText, menuPTText } from '../../pageData/language/menu';
import { defaultNewsText, enNewsText, ptNewsText } from '../../pageData/language/news';
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
    cookieLogout} from '../../settings';
import {tempUser} from '../../pageData/mock/user';

const defaultState: IAppSettings = {
    menuText : defaultMenuText,
    newsLanguage: defaultNewsText,
    addCommentText: defaultAddCommentText,
    commentText: defaultCommentText,
    presentationLanguage: currentLanguage(),
    isLogged: checkLogin(),
    loggedUser: getCurrentUser()
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
            setCurrentUser(tempUser);
            return{...state,
                isLogged: true,
                loggedUser: tempUser
            };
        }

    default: 
            return state;
    }
}