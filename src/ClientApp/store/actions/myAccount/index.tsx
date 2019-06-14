import { commonServerAction } from "../appSettings/common";
import { makeLoginOnServer, makeLogoutOnServer, changeNameServerCall, checkPasswordServerCall, changePasswordServerCall, checkEmailServerCall } from "./myAccountServerCalls";
import { LOAD_LOGIN_MENU, setCurrentUser, cookieLogout, pageHome, newsRoute, viewsNewsRoute, updateCurrentUserNames, LOAD_MYACCOUNT, LOAD_MYACCOUNT_PASSWORD, LOAD_MYACCOUNT_EMAIL } from "../../../settings";
import { IServerPayload } from "../../../interfaces/common";
import { MAKE_LOGIN, MAKE_LOGOUT, RESET_LOGIN_STATUS, RESET_MYACCOUNT_STATUS, CHANGE_MYACCOUNT_NAME, MYACCOUNT_CHECK_OLD_PASSWORD, MYACCOUNT_CHANGE_PASSWORD, MYACCOUNT_CHECK_PASSWORD, MYACCOUNT_CHECK_EMAIL, RESET_MYACCOUNT_SUCCSESS, MYACCOUNT_DISABLE_ACCOUNT, MYACCOUNT_ENABLE_ACCOUNT, MYACCOUNT_CLOSE_ACCOUNT } from "../../actionTypes";
import { IMyAccountAction, IchangeNameArg, IMyaccountChangePasswordArg, IMyaccountCloseArg } from "../../../interfaces/myAccount";
import { IcurrentUser } from "../../../interfaces/currentUser";

export function makeLogin( user: string, password: string )  : Function {
    return (dispatch: Function) =>  { 
        commonServerAction( dispatch, makeLoginOnServer, makeLoginSuccess, {user, password}, null , true, LOAD_LOGIN_MENU, updateLoginToken );
    }
}

function updateLoginToken( result: IServerPayload, serverCallArg: any, successCallArg: any, dispatch: Function ) : void
{
    if(result.loginData.success)
    {
        setCurrentUser(result.loginData.user);
    }
}

function makeLoginSuccess( result: IServerPayload ) : IMyAccountAction {
    return {
        type: MAKE_LOGIN,
        payload: {
                login: result.loginData
            }
    }
}

export function makeLogout( user: IcurrentUser) : Function {
    return (dispatch: Function) =>  
    {     
        commonServerAction( dispatch, makeLogoutOnServer, logout, user, null , true, LOAD_LOGIN_MENU, null, logoutFunctions );
    } 
}

function logoutFunctions( serverCallArg: any, successCallArg: any, dispatch: Function ) : void {
    cookieLogout();  
    if(window.location.pathname !== pageHome && window.location.pathname !== newsRoute && window.location.pathname.substring( 0, viewsNewsRoute.length ) !== viewsNewsRoute )  
        {window.location.assign(pageHome); }  
}

function logout(result:IServerPayload) : IMyAccountAction {
    return {
        type: MAKE_LOGOUT
    }
}

export function resetLoginStatus() : IMyAccountAction {
    return {
        type: RESET_LOGIN_STATUS
    }
}

export function resetMyAccountStatus() : IMyAccountAction {
    return {
        type: RESET_MYACCOUNT_STATUS        
    }
}

export function resetMyAccountSuccess() : IMyAccountAction {
    return {
        type: RESET_MYACCOUNT_SUCCSESS       
    }
}

export function changeName ( name: string, surname: string, uuid: string ) : Function {
    return (dispatch: Function) =>  
    {     
        commonServerAction( dispatch, changeNameServerCall, changeNameSuccess, { name, surname, uuid }, null , true, LOAD_MYACCOUNT, updateCookieName );
    } 
}

function updateCookieName( result: IServerPayload, serverCallArg: IchangeNameArg, successCallArg: any, dispatch: Function ): void {
    if( result.myAccount.name !== null && result.myAccount.name !== undefined ) {
        updateCurrentUserNames( result.myAccount.name.name, result.myAccount.name.surname );
    }
}

function changeNameSuccess( result: IServerPayload ): IMyAccountAction {
    return {
        type: CHANGE_MYACCOUNT_NAME,
        payload: {
            success: result.myAccount.success,
            changeName: result.myAccount.name
        }
    }
}

export function checkPassword( password: string, uuid: string, passwordChange: boolean ): Function {
    let checkPwArg: IMyaccountChangePasswordArg = {
        password: password,
        uuid: uuid
    };
    return ( dispatch: Function ) => {
        commonServerAction( dispatch, checkPasswordServerCall, checkPasswordSuccess, checkPwArg, passwordChange , true, LOAD_MYACCOUNT_PASSWORD );
    }
}

function checkPasswordSuccess( result: IServerPayload, passwordChange: boolean ): IMyAccountAction {
    if( passwordChange ) {
        return {
            type: MYACCOUNT_CHECK_OLD_PASSWORD,
            payload: {
                changePassword: result.myAccount.password
            }
        }
    }
    else {
        return {
            type: MYACCOUNT_CHECK_PASSWORD,
            payload: {
                closeAccount: {
                    validPassword: result.myAccount.password.validPassword,
                    wrongPassword: result.myAccount.password.wrongPassword
                }
            }
        }
    }
}

export function changePassword( oldPassword: string, newPassword: string, uuid: string ): Function {
    let checkPwArg: IMyaccountChangePasswordArg = {
        password: oldPassword,
        newPassword: newPassword,
        uuid: uuid
    };
    return ( dispatch: Function ) => {
        commonServerAction( dispatch, changePasswordServerCall, changePasswordSuccess, checkPwArg, null , true, LOAD_MYACCOUNT );
    }
}

function changePasswordSuccess ( result: IServerPayload ): IMyAccountAction {
    return {
        type: MYACCOUNT_CHANGE_PASSWORD,
        payload: {
            success: result.myAccount.success,
            changePassword: result.myAccount.password
        }
    };
}

export function checkEmail( email: string, uuid: string ): Function {
    let checkEmailArg: IMyaccountCloseArg = {
        email: email,
        uuid: uuid
    };
    return ( dispatch: Function ) => {
        commonServerAction( dispatch, checkEmailServerCall, checkEmailSuccess, checkEmailArg, null , true, LOAD_MYACCOUNT_EMAIL );
    }
}

function checkEmailSuccess( result: IServerPayload ): IMyAccountAction {    
    return {
        type: MYACCOUNT_CHECK_EMAIL,
        payload: {
            closeAccount: {
                validEmail: result.myAccount.email.validEmail,
                wrongEmail: result.myAccount.email.wrongEmail
            }
        }
    }    
}

export function disableAccount( email: string, password: string, uuid: string ): Function {
    let disableAccountArg: IMyaccountCloseArg = {
        password: password,
        email: email,
        uuid: uuid
    };
    return ( dispatch: Function ) => {
        commonServerAction( dispatch, null, disableAccountSuccess, disableAccountArg, null , true, LOAD_MYACCOUNT );
    };
}

function disableAccountSuccess( result: IServerPayload ): IMyAccountAction {
    return {
        type: MYACCOUNT_DISABLE_ACCOUNT,
        payload: {
            success: result.myAccount.success,
            closeAccount: {
                validEmail: result.myAccount.email.validEmail,
                validPassword: result.myAccount.password.validPassword,
                wrongEmail: result.myAccount.email.wrongEmail,
                wrongPassword: result.myAccount.password.wrongPassword
            }
        }
    }
}

export function enableAccount( email: string, password: string, uuid: string ): Function {
    let enableAccountArg: IMyaccountCloseArg = {
        password: password,
        email: email,
        uuid: uuid
    };
    return ( dispatch: Function ) => {
        commonServerAction( dispatch, null, enableAccountSuccess, enableAccountArg, null , true, LOAD_MYACCOUNT );
    };
}

function enableAccountSuccess( result: IServerPayload ): IMyAccountAction {
    return {
        type: MYACCOUNT_ENABLE_ACCOUNT,
        payload: {
            success: result.myAccount.success,
            closeAccount: {
                validEmail: result.myAccount.email.validEmail,
                validPassword: result.myAccount.password.validPassword,
                wrongEmail: result.myAccount.email.wrongEmail,
                wrongPassword: result.myAccount.password.wrongPassword
            }
        }
    }
}

export function closeAccount( email: string, password: string, uuid: string ): Function {
    let closeAccountArg: IMyaccountCloseArg = {
        password: password,
        email: email,
        uuid: uuid
    };

    let currUser: IcurrentUser = {
        uuid: uuid, 
        email:email,
        name: '',
        surname: '',
        enabled: true,
        permission: 1
    };

    return ( dispatch: Function ) => {
        commonServerAction( dispatch, null, closeAccountSuccess, closeAccountArg, null , true, LOAD_MYACCOUNT, null, dispatch( makeLogout( currUser ) ) );
    };
}

function closeAccountSuccess( result: IServerPayload ): IMyAccountAction {
    return {
        type: MYACCOUNT_CLOSE_ACCOUNT,
        payload: {
            success: result.myAccount.success,
            closeAccount: {
                validEmail: result.myAccount.email.validEmail,
                validPassword: result.myAccount.password.validPassword,
                wrongEmail: result.myAccount.email.wrongEmail,
                wrongPassword: result.myAccount.password.wrongPassword
            }
        }
    }
}
