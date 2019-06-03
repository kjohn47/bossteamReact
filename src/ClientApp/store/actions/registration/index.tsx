import { IRegistrationAction, ICheckUsernameResult, IRegistrationResult, IUserRegistrationArg } from "../../../interfaces/registration";
import { CHECK_USERNAME, MAKE_REGISTRATION, RESET_REGISTRATION } from "../../actionTypes";
import { commonServerAction } from "../common";
import { LOAD_REGISTRATION } from "../../../settings";
import { checkUsenameExists, registrateUserInServer } from "./registrationServerCalls";

export function checkUserNameRegistration( username: string ) : Function {
    return (dispatch: Function) =>  {   
        commonServerAction( dispatch, checkUsenameExists, checkUserNameRegistrationSuccess, username, null, true, LOAD_REGISTRATION );
    }
}

function checkUserNameRegistrationSuccess( result: ICheckUsernameResult ): IRegistrationAction {
    return {        
        type: CHECK_USERNAME,
        payload: {
            usernameInUse: result.usernameInUse
        }        
    }
}

export function makeUserRegistration ( name: string, surname: string, email: string, username: string, password: string ): Function {
    let registrationData: IUserRegistrationArg = {
        name: name,
        surname: surname,
        email: email,
        username: username,
        password:password
    }
    return (dispatch: Function) =>  {   
        commonServerAction( dispatch, registrateUserInServer, makeUserRegistrationSuccess, registrationData, null );
    }
}

function makeUserRegistrationSuccess( result: IRegistrationResult ): IRegistrationAction {
    return {        
        type: MAKE_REGISTRATION,
        payload: {
            usernameInUse: result.usernameInUse,
            registrationSuccess: result.registrationSuccess
        }        
    }
}

export function resetRegistration(): IRegistrationAction {
    return {
        type: RESET_REGISTRATION
    }
}