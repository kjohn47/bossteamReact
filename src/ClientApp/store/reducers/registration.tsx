import { IRegistrationReduxState, IRegistrationAction } from "../../interfaces/registration";
import { CHECK_USERNAME, MAKE_REGISTRATION, RESET_REGISTRATION } from "../actionTypes";

//// -- Default registration state
const defaultState: IRegistrationReduxState = {
    usernameInUse: false,
    registrationSuccess: false
}

//// -- News Reducer

export function registration( state:IRegistrationReduxState = defaultState, action:IRegistrationAction ) : IRegistrationReduxState {

    switch (action.type) {
        case CHECK_USERNAME: {  
            return {...state,
                 usernameInUse: action.payload.usernameInUse
            };
        }

        case MAKE_REGISTRATION: {            
            return {...state,
                usernameInUse: action.payload.usernameInUse,
                registrationSuccess: action.payload.registrationSuccess
            }
        }

        case RESET_REGISTRATION: {
            return {...state,
                usernameInUse: false,
                registrationSuccess: false
            }
        }

        default: 
        {
            return state;
        }
    }
}