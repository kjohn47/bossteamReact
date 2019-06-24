//APP GENERIC -- Do not change, will break app
export const ptCode = 'PT';
export const enCode = 'EN';
export const results = {
    success: 'Success',
    failure: 'Failure',
    default: ''
}

// TRANSLATION KEYS
export const TEXT_COMMENT = 'TEXT_COMMENT';
export const TEXT_COMMENT_ADD = 'TEXT_COMMENT_ADD';
export const TEXT_PAGE_NOT_FOUND = 'TEXT_PAGE_NOT_FOUND';
export const TEXT_LOGIN_MENU = 'TEXT_LOGIN_MENU';
export const TEXT_NEED_LOGIN = 'TEXT_NEED_LOGIN';
export const TEXT_MENU = 'TEXT_MENU';
export const TEXT_MY_ACCOUNT = 'TEXT_MY_ACCOUNT';
export const TEXT_NEWS_LIST = 'TEXT_NEWS_LIST';
export const TEXT_REGISTRATION = 'TEXT_REGISTRATION';

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