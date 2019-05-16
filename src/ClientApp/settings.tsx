import {IcurrentUser} from './interfaces/currentUser';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const ptCode = 'PT';
export const enCode = 'EN';

export const currentLanguage = () => {
   return cookies.get('appLanguage');
};

export const setLanguage = (lang: string = ptCode) => {
   cookies.set('appLanguage', lang, { path: '/' });
};

export const getCurrentUser = () => {
   return cookies.get('appCurrentUser');
};

export const setCurrentUser = (userData: IcurrentUser ) => {
   cookies.set('appCurrentUser', userData, { path: '/' }) 
};

export const cookieLogout = () => {
   cookies.remove('appCurrentUser', { path: '/' });
};

export const checkLogin = () => {
   return getCurrentUser() !== null && getCurrentUser() !== undefined;
};