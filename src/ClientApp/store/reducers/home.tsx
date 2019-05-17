import { GET_PRESENTATION_DATA, CHANGE_PRESENTATION_LANGUAGE, GET_HOME_IMAGE } from '../actionTypes';
import { IHomeAction, IHomeRedux, IpresentationData, IpresentationServer } from '../../interfaces/home';
import {enCode} from '../../settings';

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
    let presentationData : IpresentationData = {
        description: language === enCode ? presentationServer.descriptionEN : presentationServer.description,
        introduction: language === enCode ? presentationServer.introductionEN : presentationServer.introduction,
        title: language === enCode ? presentationServer.titleEN : presentationServer.title
    };
    
    return presentationData;
}

//// -- Homepage presentation

//// -- Homepage presentation reducer
export function home(state:IHomeRedux = defaultState, action:IHomeAction) {

    switch (action.type) {
        case GET_PRESENTATION_DATA: {     
            let presentationFromServer = action.payload.presentation;
            return {...state,
                presentationData: changePresentationLanguage(action.payload.language, presentationFromServer),
                presentationServer: presentationFromServer
            };
        }
        case CHANGE_PRESENTATION_LANGUAGE: {  
            return {...state, 
                presentationData: changePresentationLanguage(action.payload.language, state.presentationServer),
            };
        }
        case GET_HOME_IMAGE: {
            return {...state,
                image: action.payload.image
            };
        }

    default: 
            return state;
    }
}

//// -- Homepage presentation reducer

