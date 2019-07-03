import { InewsDataArg } from '../../../interfaces/news';
import { ICommentData, IServerResponse } from '../../../interfaces/common';
import { serverResolve } from '../appSettings/common';
import { ERROR_ADD_COMMENT, ERROR_GET_NEWS_DATA, ERROR_GET_NEWS_LIST, restServer } from '../../../settings';
import axios from 'axios';
import { IcurrentUser } from '../../../interfaces/currentUser';

//// NEWS

export async function getNewsListFromServer( short: boolean = false ) : Promise<any>
{
    return await serverResolve( () =>
    {   
        if(short){
            return axios.get(restServer + "newsListShort").then( (response) => {return response.data});                
        }
        else{
            return axios.get(restServer + "newsList").then( (response) => {return response.data});
        }
    }, ERROR_GET_NEWS_LIST)
}

export async function getNewsDataFromServer( ID:number ) : Promise<any>
{
    return await serverResolve( () =>
    {
        return axios.get(restServer + "newsData/" + ID).then( (response) => {return response.data});
    }, ERROR_GET_NEWS_DATA)
}

export async function addNewsCommentToServer( newsArg: InewsDataArg ) : Promise<any>
{    
    return await serverResolve( ( currentUser: IcurrentUser ) =>
    {
        let newComment: ICommentData = {
            Comment: newsArg.comment,
            Owner: currentUser.name + " " + currentUser.surname,
            Time: new Date().toISOString(),
            ID:123,
            OwnerID: currentUser.uuid
        } 
        //// when using real rest server this must be adapted correctly using POST but for now:
        //// how it will work: make post with data and return updated news comment list from server
        return axios.get(restServer + "newsData/" + newsArg.newsID).then( (response) => {
            let serverData:IServerResponse = response.data;
            serverData.payload.newsData.comments !== null && serverData.payload.newsData.comments !== undefined ? serverData.payload.newsData.comments.push(newComment) : serverData.payload.newsData.comments = [newComment];
            
            return axios.put(restServer + "newsData/" + newsArg.newsID, {...serverData}).then( () => {
                let serverResponse: IServerResponse = {
                    hasError: false,
                    payload: {
                        comments: serverData.payload.newsData.comments
                    }
                }
                return serverResponse;
            })           
                 
        });
    }, ERROR_ADD_COMMENT)
}

//// NEWS