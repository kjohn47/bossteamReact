import {IcurrentUser} from './interfaces/currentUser';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const ptCode = 'PT';
export const enCode = 'EN';

export const currentLanguage = () => {
   return cookies.get('appLanguage');
};

export const setLanguage = (lang: string = ptCode) => {
   return cookies.set('appLanguage', lang, { path: '/' });
};

export const getCurrentUser = () => {
   return cookies.get('appCurrenUser');
};

export const setCurrentUser = (userData: IcurrentUser = null) => {
   return cookies.set('appCurrenUser', userData, { path: '/' });
};

export const checkLogin = () => {
   return getCurrentUser() !== null && getCurrentUser() !== undefined;
}