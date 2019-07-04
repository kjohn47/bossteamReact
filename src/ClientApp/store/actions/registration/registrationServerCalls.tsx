import { IUserRegistrationArg } from "../../../interfaces/registration";
import { serverResolve } from "../appSettings/common";
import { ERROR_USER_REGISTRATION, restServer } from "../../../settings";
import { IServerResponse } from "../../../interfaces/common";
import axios from 'axios';
import sha1 from 'sha1';

export async function checkUsenameExists( username: string ): Promise<any> {
    return await serverResolve( () =>
    {
        let userAvailable: IServerResponse = { ////This should come from server
            hasError: false,
            payload: {
                checkUsernameResponse: {
                    usernameInUse: false
                }
            }            
        };

        ////Just a mock, needs to be different in case of real server call
        return axios.get(restServer + "Users?username=" + username ).then( (response) => {
            let userFromServer: IServerResponse[] = response.data;
            if( userFromServer !== null && userFromServer !== undefined && userFromServer.length > 0 )
            {
                userAvailable.payload.checkUsernameResponse.usernameInUse = true;
            }

            return userAvailable;
        }); 

    }, ERROR_USER_REGISTRATION);
}

export async function registrateUserInServer( registrationArg: IUserRegistrationArg ): Promise<any> {
    return await serverResolve( () =>
    {
        let serverData: IServerResponse = { ////This should come from server
            hasError: false,
            payload: {
                registrationData: {
                    usernameInUse: false,
                    registrationSuccess: false
                }
            }            
        };

        return axios.get(restServer + "Users?username=" + registrationArg.username ).then( (response) => {
            let userFromServer: IServerResponse[] = response.data;
            if( userFromServer !== null && userFromServer !== undefined && userFromServer.length > 0 )
            {
                serverData.payload.registrationData.usernameInUse = true;
                return serverData;
            }
            else
            {
                return axios.get(restServer + "Users").then( (usersList) => {
                    let userListServer: IServerResponse[] = usersList.data;
                    let uuid: string = registrationArg.email + registrationArg.username;
                    let newUser: IServerResponse = {
                        id: userListServer.length + 1,
                        uuid: uuid,
                        hasError: false,
                        username: registrationArg.username,
                        password: sha1( registrationArg.password ),
                        sessionId: "",
                        payload: {
                            loginData: {
                                success: true,
                                user: {
                                    name: registrationArg.name,
                                    surname: registrationArg.surname,
                                    permission: 1,
                                    email: registrationArg.email,
                                    enabled: true
                                }
                            }
                        }
                    }               
    
                    return axios.post(restServer + "Users", newUser ).then( (response) => {                    
                        if ( response.data !== null && response.data !== undefined )
                            {
                                serverData.payload.registrationData.registrationSuccess = true
                            }
                        return serverData;
                    }) 
                } )                                
            }
        })

    }, ERROR_USER_REGISTRATION);    
}
