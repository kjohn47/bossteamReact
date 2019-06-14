import { IcurrentUser } from '../../../interfaces/currentUser';
import { ILoginState } from '../../../interfaces/login';
import { serverResolve } from '../appSettings/common';
import { ERROR_LOGIN, ERROR_LOGOUT, restServer, results, ERROR_MYACCOUNT_CHANGENAME, ERROR_MYACCOUNT_CHANGEPASSWORD } from '../../../settings';
import { IServerResponse } from '../../../interfaces/common';
import axios from 'axios';
import sha1 from 'sha1';
import { IMyAccountResponse, IchangeNameArg, IMyaccountChangePasswordArg, IMyaccountCloseArg } from '../../../interfaces/myAccount';

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
                return userFromServer[0];
            }

            return loginFailReturn;
        }); 
        
    }, ERROR_LOGIN)
}

export async function makeLogoutOnServer( user: IcurrentUser ) : Promise<any>{
    return await serverResolve( () =>
    {
        let serverReturn: IServerResponse = {
            hasError: false
        }
        
        if(user === null )
        {
            throw new Error("Invalid user");
        }
        else
        {            
            return new Promise( (resolve: Function) => { 
                setTimeout( () => {
                    resolve( serverReturn )
                    }, 800 )
            })
        }
    }, ERROR_LOGOUT)
}

export async function changeNameServerCall( changeNameArg: IchangeNameArg ) : Promise<any> {
    return await serverResolve( () => 
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
        return axios.get( restServer + "Users?uuid=" + changeNameArg.uuid )
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
    return await serverResolve( () =>
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
        return axios.get(restServer + "Users?uuid=" + checkPwArg.uuid + "&password=" + sha1( checkPwArg.password ) ).then( (response) => {
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
    return await serverResolve( () =>
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
        return axios.get(restServer + "Users?uuid=" + checkPwArg.uuid + "&password=" + sha1( checkPwArg.password ) ).then( (response) => {
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
    return await serverResolve( () =>
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
        return axios.get(restServer + "Users?uuid=" + checkEmailArg.uuid ).then( (response) => {
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