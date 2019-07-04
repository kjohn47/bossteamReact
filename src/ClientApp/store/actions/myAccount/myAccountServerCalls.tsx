import { IcurrentUser } from '../../../interfaces/currentUser';
import { ILoginState } from '../../../interfaces/login';
import { serverResolve } from '../appSettings/common';
import { ERROR_LOGIN, ERROR_LOGOUT, restServer, results, ERROR_MYACCOUNT_CHANGENAME, ERROR_MYACCOUNT_CHANGEPASSWORD, ERROR_MYACCOUNT_CLOSE_DISABLE } from '../../../settings';
import { IServerResponse } from '../../../interfaces/common';
import axios from 'axios';
import sha1 from 'sha1';
import { IMyAccountResponse, IchangeNameArg, IMyaccountChangePasswordArg, IMyaccountCloseArg, IUserSession } from '../../../interfaces/myAccount';

export async function makeLoginOnServer( loginArg: ILoginState ) : Promise<any>{
    return await serverResolve( () =>
    {
        //this should come from server
        let loginFailReturn:IServerResponse = {
            hasError: false,
            payload: {
                loginData: {
                    success: false
                }
            }                  
        };

        return axios.get(restServer + "Users?username=" + loginArg.user + "&password=" + sha1( loginArg.password ) ).then( (response) => {
            let userFromServer: IServerResponse[] = response.data;
            if( userFromServer !== null && userFromServer !== undefined && userFromServer.length > 0 )
            {
                let user: IServerResponse = userFromServer[0];
                let date = new Date();
                user.sessionId = sha1( loginArg.user + loginArg.password + date.toString() );
                return axios.put( restServer + "Users/" + user.id, {...user} )
                .then ( () => {
                    user.payload.loginData.session = {
                        sessionId: user.sessionId,
                        uuid: user.uuid
                    };
                    
                    return user;
                });
            }

            return loginFailReturn;
        }); 
        
    }, ERROR_LOGIN)
}

export async function makeLoginWithSession( sessionArg: IUserSession ) : Promise<any>{
    return await serverResolve( () =>
    {
        //this should come from server
        let loginFailReturn:IServerResponse = {
            hasError: true,
            errorMessage: "Session has expired, make login again",
            payload: {
            }
        };

        return axios.get(restServer + "Users?uuid=" + sessionArg.uuid ).then( (response) => {
            let userFromServer: IServerResponse[] = response.data;            
            if( userFromServer !== null && userFromServer !== undefined && userFromServer.length > 0 )
            {
                let user: IServerResponse = userFromServer[0];
                    user.payload.loginData.session = {
                        sessionId: user.sessionId,
                        uuid: user.uuid
                    };
                    
                return user.sessionId === sessionArg.sessionId ? user : loginFailReturn;
            }

            return loginFailReturn;
        }); 
        
    }, ERROR_LOGIN)
}

export async function makeLogoutOnServer() : Promise<any>{
    return await serverResolve( ( userSession: IUserSession ) =>
    {
        let serverReturn: IServerResponse = {
            hasError: false
        }

        return axios.get(restServer + "Users?uuid=" + userSession.uuid ).then( (response) => {
            let userFromServer: IServerResponse[] = response.data;
            if( userFromServer !== null && userFromServer !== undefined && userFromServer.length > 0 )
            {
                let user: IServerResponse = userFromServer[0];
                user.sessionId = "";
                return axios.put( restServer + "Users/" + user.id, {...user} )
                .then ( () => {
                    
                    return serverReturn;
                });
            }

            serverReturn.hasError = true;
            serverReturn.errorMessage = "Invalid user";

            return serverReturn;
        }); 
            
    }, ERROR_LOGOUT)
}

export async function changeNameServerCall( changeNameArg: IchangeNameArg ) : Promise<any> {
    return await serverResolve( ( currentSession: IUserSession ) => 
    {
        let changeName: IMyAccountResponse = {
            success: results.failure
        }; 

        let serverReturn: IServerResponse = {
            hasError: false,
            payload: {
                myAccount: changeName
            }
        }
        return axios.get( restServer + "Users?uuid=" + currentSession.uuid )
        .then( ( response ) => {
            let userFromServerArray: IServerResponse[] = response.data;
            if( userFromServerArray === null || userFromServerArray === undefined || userFromServerArray.length <= 0 )
            {
                return serverReturn;
            }

            let newUserData: IServerResponse = userFromServerArray[0];
            newUserData.payload.loginData.user.name = changeNameArg.name;
            newUserData.payload.loginData.user.surname = changeNameArg.surname;
            return axios.put( restServer + "Users/" + newUserData.id, {...newUserData} )
            .then ( () => {
                changeName = {
                    success: results.success,
                    name: {
                        name: changeNameArg.name,
                        surname: changeNameArg.surname
                    }
                };
                serverReturn = {...serverReturn,
                    payload: {...serverReturn.payload,
                        myAccount: changeName
                    }
                };

                return serverReturn;
            })
        });

    }, ERROR_MYACCOUNT_CHANGENAME );    
}

export async function checkPasswordServerCall( checkPwArg: IMyaccountChangePasswordArg ): Promise<any> {
    return await serverResolve( ( currentSession: IUserSession ) =>
    {
        let validPassword: IServerResponse = { ////This should come from server
            hasError: false,
            payload: {
                myAccount: {
                    success: results.success,
                    password: {
                        validPassword: false,
                        wrongPassword: true
                    }
                }
            }
        };

        ////Just a mock, needs to be different in case of real server call
        return axios.get(restServer + "Users?uuid=" + currentSession.uuid + "&password=" + sha1( checkPwArg.password ) ).then( (response) => {
            let userFromServer: IServerResponse[] = response.data;
            if( userFromServer !== null && userFromServer !== undefined && userFromServer.length > 0 )
            {
                validPassword.payload.myAccount.password = {
                    validPassword: true,
                    wrongPassword: false
                }
            }

            return validPassword;
        }); 

    } );
}

export async function changePasswordServerCall( checkPwArg: IMyaccountChangePasswordArg ): Promise<any> {
    return await serverResolve( ( currentSession: IUserSession ) =>
    {
        let validPassword: IServerResponse = { ////This should come from server
            hasError: false,
            payload: {
                myAccount: {
                    success: results.failure,
                    password: {
                        validPassword: false,
                        wrongPassword: true
                    }
                }
            }
        };

        ////Just a mock, needs to be different in case of real server call
        return axios.get(restServer + "Users?uuid=" + currentSession.uuid + "&password=" + sha1( checkPwArg.password ) ).then( (response) => {
            let userFromServer: IServerResponse[] = response.data;
            if( userFromServer !== null && userFromServer !== undefined && userFromServer.length > 0 )
            {
                validPassword.payload.myAccount.password = {
                    validPassword: true,
                    wrongPassword: false
                }
                let user = userFromServer[0];
                user = { ...user,
                    password: sha1( checkPwArg.newPassword )
                }

                return axios.put( restServer + "Users/" + user.id, { ...user } ).then( () => {
                    validPassword.payload.myAccount.success = results.success;
                    return validPassword;
                })
            }

            return validPassword;
        }); 

    }, ERROR_MYACCOUNT_CHANGEPASSWORD );
}

export async function checkEmailServerCall( checkEmailArg: IMyaccountCloseArg ): Promise<any> {
    return await serverResolve( ( currentSession: IUserSession ) =>
    {
        let validEmail: IServerResponse = { ////This should come from server
            hasError: false,
            payload: {
                myAccount: {
                    success: results.success,
                    email: {
                        validEmail: false,
                        wrongEmail: true
                    }
                }
            }
        };

        ////Just a mock, needs to be different in case of real server call
        return axios.get(restServer + "Users?uuid=" + currentSession.uuid ).then( (response) => {
            let userFromServer: IServerResponse[] = response.data;
            if( userFromServer !== null && userFromServer !== undefined && userFromServer.length > 0 && userFromServer[0].payload.loginData.user.email === checkEmailArg.email )
            {
                validEmail.payload.myAccount.email = {
                    validEmail: true,
                    wrongEmail: false
                };                
            }

            return validEmail;
        }); 
    } );
}

export async function disableAccountServerCall( disableAccountArg: IMyaccountCloseArg ) : Promise<any>{
    return await serverResolve( ( currentSession: IUserSession ) =>
    {
        let serverReturn: IServerResponse = {
            hasError: false,
            payload: {
                myAccount: {
                    success: results.failure,
                    email: {
                        validEmail: false,
                        wrongEmail: false
                    },
                    password: {
                        validPassword: false,
                        wrongPassword: true
                    },
                    enabled: false
                }
            }
        };
                       
        return axios.get( restServer + "Users?uuid=" + currentSession.uuid + "&password=" + sha1( disableAccountArg.password ) )
        .then( ( response ) => {
            let userFromServerArray: IServerResponse[] = response.data;
            if( userFromServerArray === null || userFromServerArray === undefined || userFromServerArray.length <= 0 ) {
                return serverReturn;
            }

            let newUserData: IServerResponse = userFromServerArray[0];
            serverReturn.payload.myAccount.password.wrongPassword = false;
            serverReturn.payload.myAccount.password.validPassword = true;

            if( newUserData.payload.loginData.user.email !== disableAccountArg.email ) {
                serverReturn.payload.myAccount.email.wrongEmail = true;
                return serverReturn;
            }
            else {
                serverReturn.payload.myAccount.email.validEmail = true;
            }

            newUserData.payload.loginData.user.enabled = false;

            return axios.put( restServer + "Users/" + newUserData.id, {...newUserData} )
            .then ( () => {
                    serverReturn.payload.myAccount.success = results.success;
                    return serverReturn;
            })
        });
    }, ERROR_MYACCOUNT_CLOSE_DISABLE )
}

export async function enableAccountServerCall( enableAccountArg: IMyaccountCloseArg ) : Promise<any>{
    return await serverResolve( ( currentSession: IUserSession ) =>
    {
        let serverReturn: IServerResponse = {
            hasError: false,
            payload: {
                myAccount: {
                    success: results.failure,
                    email: {
                        validEmail: false,
                        wrongEmail: false
                    },
                    password: {
                        validPassword: false,
                        wrongPassword: true
                    },
                    enabled: true
                }
            }
        };
                       
        return axios.get( restServer + "Users?uuid=" + currentSession.uuid + "&password=" + sha1( enableAccountArg.password ) )
        .then( ( response ) => {
            let userFromServerArray: IServerResponse[] = response.data;
            if( userFromServerArray === null || userFromServerArray === undefined || userFromServerArray.length <= 0 ) {
                return serverReturn;
            }

            let newUserData: IServerResponse = userFromServerArray[0];
            serverReturn.payload.myAccount.password.wrongPassword = false;
            serverReturn.payload.myAccount.password.validPassword = true;

            if( newUserData.payload.loginData.user.email !== enableAccountArg.email ) {
                serverReturn.payload.myAccount.email.wrongEmail = true;
                return serverReturn;
            }
            else {
                serverReturn.payload.myAccount.email.validEmail = true;
            }

            newUserData.payload.loginData.user.enabled = true;

            return axios.put( restServer + "Users/" + newUserData.id, {...newUserData} )
            .then ( () => {
                    serverReturn.payload.myAccount.success = results.success;
                    return serverReturn;
            })
        });
    }, ERROR_MYACCOUNT_CLOSE_DISABLE )
}

export async function closeAccountServerCall( closeAccountArg: IMyaccountCloseArg ) : Promise<any>{
    return await serverResolve( ( currentSession: IUserSession ) =>
    {
        let serverReturn: IServerResponse = {
            hasError: false,
            payload: {
                myAccount: {
                    success: results.failure,
                    email: {
                        validEmail: false,
                        wrongEmail: false
                    },
                    password: {
                        validPassword: false,
                        wrongPassword: true
                    }
                }
            }
        };
                       
        return axios.get( restServer + "Users?uuid=" + currentSession.uuid + "&password=" + sha1( closeAccountArg.password ) )
        .then( ( response ) => {
            let userFromServerArray: IServerResponse[] = response.data;
            if( userFromServerArray === null || userFromServerArray === undefined || userFromServerArray.length <= 0 ) {
                return serverReturn;
            }

            let newUserData: IServerResponse = userFromServerArray[0];
            serverReturn.payload.myAccount.password.wrongPassword = false;
            serverReturn.payload.myAccount.password.validPassword = true;

            if( newUserData.payload.loginData.user.email !== closeAccountArg.email ) {
                serverReturn.payload.myAccount.email.wrongEmail = true;
                return serverReturn;
            }
            else {
                serverReturn.payload.myAccount.email.validEmail = true;
            }
            return axios.delete( restServer + "Users/" + newUserData.id ).then( ( response ) => {
                serverReturn.payload.myAccount.success = results.success;
                return serverReturn;
            })
        });
    }, ERROR_MYACCOUNT_CLOSE_DISABLE );
}