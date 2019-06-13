import { IcurrentUser } from '../../../interfaces/currentUser';
import { ILoginState } from '../../../interfaces/login';
import { serverResolve } from '../appSettings/common';
import { ERROR_LOGIN, ERROR_LOGOUT, restServer, results, ERROR_MYACCOUNT_CHANGENAME } from '../../../settings';
import { IServerResponse } from '../../../interfaces/common';
import axios from 'axios';
import sha1 from 'sha1';
import { IMyAccountChangeNameResponse, IchangeNameArg, IMyaccountChangePasswordArg } from '../../../interfaces/myAccount';

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
        let changeName: IMyAccountChangeNameResponse = {
            success: results.failure
        }; 

        let serverReturn: IServerResponse = {
            hasError: false,
            payload: {
                changeName: changeName
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
                        changeName: changeName
                    }
                };

                return serverReturn;
            })
        });

    }, ERROR_MYACCOUNT_CHANGENAME );    
}

export async function checkOldPasswordServerCall( checkPwArg: IMyaccountChangePasswordArg ): Promise<any> {
    return await serverResolve( () =>
    {
        let validPassword: IServerResponse = { ////This should come from server
            hasError: false,
            payload: {
                checkPassword: {
                    validOldPassword: false,
                    wrongOldPassword: true
                }
            }            
        };

        ////Just a mock, needs to be different in case of real server call
        return axios.get(restServer + "Users?uuid=" + checkPwArg.uuid + "&password=" + sha1( checkPwArg.oldPassword ) ).then( (response) => {
            let userFromServer: IServerResponse[] = response.data;
            if( userFromServer !== null && userFromServer !== undefined && userFromServer.length > 0 )
            {
                validPassword.payload.checkPassword = {
                    validOldPassword: true,
                    wrongOldPassword: false
                }
            }

            return validPassword;
        }); 

    } );
}