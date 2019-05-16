import { APP_GET_LANGUAGE } from '../actionTypes';
import {ptCode} from '../../settings';
export function appGetLanguage( language: string = ptCode ){
    return {
        type: APP_GET_LANGUAGE,
        payload: {
            language: language
            }
    }
}