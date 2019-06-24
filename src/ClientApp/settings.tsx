//APP GENERIC -- Do not change, will break app
export const ptCode = 'PT';
export const enCode = 'EN';
export const results = {
    success: 'Success',
    failure: 'Failure',
    default: ''
}

// TRANSLATION KEYS

// LOAD LOCALIZED KEYS
export const LOAD_LOGIN_MENU = 'LOAD_LOGIN_MENU';
export const LOAD_NEW_COMMENT = 'LOAD_NEW_COMMENT';
export const LOAD_HOME_NEWS = 'LOAD_HOME_NEWS';
export const LOAD_REGISTRATION = 'LOAD_REGISTRATION';
export const LOAD_MYACCOUNT = 'LOAD_MYACCOUNT';
export const LOAD_MYACCOUNT_PASSWORD = 'LOAD_MYACCOUNT_PASSWORD';
export const LOAD_MYACCOUNT_EMAIL = 'LOAD_MYACCOUNT_EMAIL';

//ERROR CODES KEYS -- do not change or it will break objects for translations
export const ERROR_GENERIC = 'ERROR_GENERIC';
export const ERROR_ADD_COMMENT = 'ERROR_ADD_COMMENT';
export const ERROR_LOGIN = 'ERROR_LOGIN';
export const ERROR_LOGOUT = 'ERROR_LOGOUT';
export const ERROR_HOME_PAGE = 'ERROR_HOME_PAGE';
export const ERROR_GET_NEWS_LIST = 'ERROR_GET_NEWS_LIST';
export const ERROR_GET_NEWS_DATA = 'ERROR_GET_NEWS_DATA';
export const ERROR_USER_REGISTRATION = 'ERROR_USER_REGISTRATION';
export const ERROR_MYACCOUNT_CHANGENAME = 'ERROR_MYACCOUNT_CHANGENAME';
export const ERROR_MYACCOUNT_CHANGEPASSWORD = 'ERROR_MYACCOUNT_CHANGEPASSWORD';
export const ERROR_MYACCOUNT_CLOSE_DISABLE = 'ERROR_MYACCOUNT_CLOSE_DISABLE';

//APP
export const Show_Error_Detailed = true;////set true to dev, false to prd

//SERVER
export const restServer = 'http://localhost:4000/rest/';

//ROUTES
export const pageHome = '/';
export const registrationRoute = '/registration';
export const myAccountRoute = '/myaccount';
export const newsRoute = '/news';
export const viewsNewsRoute = '/viewnews';
export const blogsListAllRoute = '/listallblogs';

// COOKIE NAMES
export const langCookie = 'appLanguage';
export const userCookie = 'appCurrentUser';