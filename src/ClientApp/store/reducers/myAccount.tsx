import { IMyAccountReduxState, IMyAccountAction } from "../../interfaces/myAccount";
import { results } from "../../settings";

//// -- Default myAccount state
const defaultState: IMyAccountReduxState = {
    changeName: {
        success: results.default
    },
    changePassword: {
        success: results.default
    },
    closeAccount: {
        success: results.default
    }
}

//// -- News Reducer

export function myAccount( state:IMyAccountReduxState = defaultState, action:IMyAccountAction ) : IMyAccountReduxState {

    switch (action.type) {
        case "CHANGE_MYACCOUNT_NAME": {  
            return {...state,
                changeName: {...state.changeName,
                    success: action.payload.success
                }
            };
        }

        default: 
        {
            return state;
        }
    }
}