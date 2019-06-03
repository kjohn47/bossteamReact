import { ICheckUsernameResult, IUserRegistrationArg, IRegistrationResult } from "../../../interfaces/registration";
import { serverResolve } from "../common";
import { ERROR_USER_REGISTRATION } from "../../../settings";

export async function checkUsenameExists( username: string ): Promise<any> {
    return await serverResolve( () =>
    {
        let serverData: ICheckUsernameResult = {
            usernameInUse: false
        };

        if( username === 'abc' )
        {
            serverData.usernameInUse = true;
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
        let serverData: IRegistrationResult = {
            usernameInUse: false,
            registrationSuccess: false
        };

        if( registrationArg.username === 'abc' )
        {
            serverData.usernameInUse = true;
        }
        else {
            serverData.registrationSuccess = true;
        }

        return new Promise( (resolve: Function) => { 
            setTimeout( () => {
                resolve(serverData)
                }, 900 )
        })
    }, ERROR_USER_REGISTRATION);    
}
