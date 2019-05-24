import { CHANGE_PRESENTATION_LANGUAGE, GET_HOME_DATA, RESET_HOME_DATA } from '../actionTypes';
import { IHomeAction, IHomeRedux, IpresentationData, IpresentationServer } from '../../interfaces/home';
import { GetPropertyValue } from '../../settings';

//// -- Default homepage presentation state
const defaultState: IHomeRedux = {
    presentationData: {
        description:"",
        introduction:"",
        title:""
    },
    presentationServer: null,
    image: {
        src: "",
        alt: "",
        link: ""
    }
}
//// -- Default homepage presentation state

//// -- Homepage presentation

function changePresentationLanguage(language:string, presentationServer: IpresentationServer)
{
    let translatedPresentation: IpresentationData = GetPropertyValue(presentationServer, language);
    if( translatedPresentation === null || translatedPresentation === undefined )
    {
        translatedPresentation = presentationServer.PT;   
    }
    let presentationData : IpresentationData = {
        description: translatedPresentation.description,
        introduction: translatedPresentation.introduction,
        title: translatedPresentation.title
    };
    
    return presentationData;
}

//// -- Homepage presentation

//// -- Homepage presentation reducer
export function home(state:IHomeRedux = defaultState, action:IHomeAction) {

    switch (action.type) {
        case CHANGE_PRESENTATION_LANGUAGE: {  
            return {...state, 
                presentationData: changePresentationLanguage(action.payload.language, state.presentationServer),
            };
        }

        case GET_HOME_DATA: {
            let presentationFromServer = action.payload.presentation;
            return {...state,
                presentationData: changePresentationLanguage(action.payload.language, presentationFromServer),
                presentationServer: presentationFromServer,
                image: action.payload.image
            };
        }

        case RESET_HOME_DATA: {
            return {...state, 
                presentationData: {
                    description:"",
                    introduction:"",
                    title:""
                },
                presentationServer: null,
                image: {
                    src: "",
                    alt: "",
                    link: ""
                }
            }
        }

    default: 
            return state;
    }
}

//// -- Homepage presentation reducer

