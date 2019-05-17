import {IcurrentUser} from './interfaces/currentUser';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const ptCode = 'PT';
export const enCode = 'EN';
export const results = {
    success: 'Success',
    failure: 'Failure',
    default: ''
}
const langCookie = 'appLanguage';
const userCookie = 'appCurrentUser';

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
   cookies.set(langCookie, lang, { path: '/' });
};

export const getCurrentUser = () => {
    return cookies.get(userCookie);  
};

export const setCurrentUser = (userData: IcurrentUser ) => {
   cookies.set(userCookie, userData, { path: '/' }) 
};

export const cookieLogout = () => {
   cookies.remove(userCookie, { path: '/' });
};

export const checkLogin = () => {
   return getCurrentUser() !== null && getCurrentUser() !== undefined;
};