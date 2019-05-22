import {IcurrentUser} from './interfaces/currentUser';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

//APP
export const ptCode = 'PT';
export const enCode = 'EN';
export const results = {
    success: 'Success',
    failure: 'Failure',
    default: ''
}
export const restServer = '/';

//ROUTES
export const pageHome = '/';
export const newsRoute = '/news';
export const viewsNewsRoute = '/ViewNews';

// COOKIE NAMES
const langCookie = 'appLanguage';
const userCookie = 'appCurrentUser';


// LOAD LOCALIZED
export const LOAD_LOGIN_MENU = 'LOAD_LOGIN_MENU';
export const LOAD_NEW_COMMENT = 'LOAD_NEW_COMMENT';
export const LOAD_HOME_NEWS = 'LOAD_HOME_NEWS';


// COOKIE METHODS
export const currentLanguage = () => {
   let lang = cookies.get(langCookie);
   if( lang === null || lang === undefined || lang === '' )
    {
        setLanguage()
        return ptCode;
    }
   return lang;
};

export const setLanguage = (lang: string = ptCode) => {
   cookies.set(langCookie, lang, { path: pageHome });
};

export const getCurrentUser = () => {
    return cookies.get(userCookie);  
};

export const setCurrentUser = (userData: IcurrentUser ) => {
   cookies.set(userCookie, userData, { path: pageHome }) 
};

export const cookieLogout = () => {
   cookies.remove(userCookie, { path: pageHome });
};

export const checkLogin = () => {
   return getCurrentUser() !== null && getCurrentUser() !== undefined;
};