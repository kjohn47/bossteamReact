import { 
    GET_NEWS_LIST, 
    CHANGE_NEWS_LANGUAGE,
    GET_NEWS_DATA,
    CHANGE_NEWS_DATA_LANGUAGE,
    ADD_NEWS_COMMENT,
    RESET_NEWS_DATA,
    RESET_NEWS_LIST
} from '../../actionTypes';
import {ptCode, LOAD_NEW_COMMENT, LOAD_HOME_NEWS} from '../../../settings';
import {IcurrentUser} from '../../../interfaces/currentUser';
import { InewsAction } from '../../../interfaces/news';
import { getNewsListFromServer, getNewsDataFromServer, addNewsCommentToServer} from './newsServerCalls';
import { IServerPayload } from '../../../interfaces/common';
import { commonServerAction } from '../appSettings/common';
//// Actions for News List

export function getNewsList( language: string = ptCode ) : Function {    
    return (dispatch: Function) =>  {   
        commonServerAction( dispatch, getNewsListFromServer, getNewsListSuccess, null, language );
    }
}

export function getNewsListShort( language: string = ptCode ) :Function {
    return (dispatch: Function) =>  {  
        commonServerAction( dispatch, getNewsListFromServer, getNewsListSuccess, true, language , true, LOAD_HOME_NEWS );
    }
}

function getNewsListSuccess( result: IServerPayload, language: string  ) : InewsAction
{
    return {
        type: GET_NEWS_LIST,
        payload: {
            language: language,
            newsList: result.newsList
        }
    }
}

export function changeNewsLanguage( language: string = ptCode ) : InewsAction {
    return {
        type: CHANGE_NEWS_LANGUAGE,
        payload: {
            language: language
            }
    }
}

export function resetNewsList() : InewsAction
{
    return {
        type: RESET_NEWS_LIST
    }
}

//// Actions for view news

export function getNewsData ( language: string = ptCode, ID: number ) : Function
{
    return (dispatch: Function) =>  {     
        commonServerAction( dispatch, getNewsDataFromServer, getNewsDataSuccess, ID, language );
    }
}

function getNewsDataSuccess ( result: IServerPayload, language: string ) : InewsAction
{
    return {
        type: GET_NEWS_DATA,
        payload: {
            language: language,
            newsData: result.newsData
        }
    }
}

export function changeNewsDataLanguage ( language: string = ptCode ) : InewsAction
{
    return {
        type: CHANGE_NEWS_DATA_LANGUAGE,
        payload: {
            language: language
        }
    }
}

export function resetNewsData() : InewsAction
{
    return {
        type: RESET_NEWS_DATA
    }
}

//Actions for adding comments

export function addNewsComment (newsID: number, comment: string, user:IcurrentUser) : Function
{
    return (dispatch: Function) =>  {
        commonServerAction( dispatch, addNewsCommentToServer, addNewsCommentSuccess, { newsID, comment, user }, newsID, true, LOAD_NEW_COMMENT );
    }
}

function addNewsCommentSuccess ( result: IServerPayload , newsID: number ) : InewsAction
{
    return {
        type: ADD_NEWS_COMMENT,
        payload: {
            comments: result.comments,
            newsID: newsID
        }
    }
}