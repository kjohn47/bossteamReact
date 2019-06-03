import { IUserRegistrationArg, IRegistrationResult } from "../../../interfaces/registration";
import { serverResolve } from "../common";
import { ERROR_USER_REGISTRATION } from "../../../settings";
import { IServerResponse } from "../../../interfaces/common";

export async function checkUsenameExists( username: string ): Promise<any> {
    return await serverResolve( () =>
    {
        let serverData: IServerResponse = {
            hasError: false,
            payload: {
                checkUsernameResponse: {
                    usernameInUse: false
                }
            }            
        };

        if( username === 'abc' )
        {
            serverData.payload.checkUsernameResponse.usernameInUse = true;
        }

        return new Promise( (resolve: Function) => { 
            setTimeout( () => {
                resolve(serverData)
                }, 900 )
        })
    }, ERROR_USER_REGISTRATION);    
}

export async function registrateUserInServer( registrationArg: IUserRegistrationArg ): Promise<any> {
    return await serverResolve( () =>
    {
        let serverData: IServerResponse = {
            hasError: false,
            payload: {
                registrationData: {
                    usernameInUse: false,
                    registrationSuccess: false
                }
            }            
        };

        if( registrationArg.username === 'abc' )
        {
            serverData.payload.registrationData.usernameInUse = true;
        }
        else {
            serverData.payload.registrationData.registrationSuccess = true;
        }

        return new Promise( (resolve: Function) => { 
            setTimeout( () => {
                resolve(serverData)
                }, 900 )
        })
    }, ERROR_USER_REGISTRATION);    
}
