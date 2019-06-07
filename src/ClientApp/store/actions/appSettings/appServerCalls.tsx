import { IcurrentUser } from '../../../interfaces/currentUser';
import { ILoginState } from '../../../interfaces/login';
import { serverResolve } from '../common';
import { ERROR_LOGIN, ERROR_LOGOUT, restServer } from '../../../settings';
import { IServerResponse } from '../../../interfaces/common';
import axios from 'axios';
import sha1 from 'sha1';

//// APP
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
//// APP

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
