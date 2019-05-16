import { APP_GET_LANGUAGE } from '../actionTypes';
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
    getCurrentUser} from '../../settings';
import {tempUser} from '../../pageData/mock/user';

setCurrentUser(tempUser);

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

    default: 
            return state;
    }
}