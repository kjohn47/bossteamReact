import { 
    GET_NEWS_LIST, 
    GET_NEWS_LIST_SHORT, 
    CHANGE_NEWS_LANGUAGE,
    GET_NEWS_DATA,
    CHANGE_NEWS_DATA_LANGUAGE,
    ADD_NEWS_COMMENT 
} from '../actionTypes';
import {ptCode} from '../../settings';
import {IcurrentUser} from '../../interfaces/currentUser';
//// Actions for News List

export function getNewsList( language: string = ptCode ){
    return {
        type: GET_NEWS_LIST,
        payload: {
            language: language
            }
    }
}

export function getNewsListShort( language: string = ptCode ){
    return {
        type: GET_NEWS_LIST_SHORT,
        payload: {
            language: language
            }
    }
}

export function changeNewsLanguage( language: string = ptCode ){
    return {
        type: CHANGE_NEWS_LANGUAGE,
        payload: {
            language: language
            }
    }
}

//// Actions for view news

export function getNewsData ( language: string = ptCode, ID: number )
{
    return {
        type: GET_NEWS_DATA,
        payload: {
            language: language,
            ID: ID
        }
    }
}

export function changeNewsDataLanguage ( language: string = ptCode )
{
    return {
        type: CHANGE_NEWS_DATA_LANGUAGE,
        payload: {
            language: language
        }
    }
}

export function addNewsComment (newsID: number, comment: string, user:IcurrentUser)
{
    return {
        type: ADD_NEWS_COMMENT,
        payload: {
            ID: newsID,
            comment: comment,
            user: user
        }
    }
}