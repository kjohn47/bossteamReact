//@ts-ignore
import axios from 'axios';

import { mockNewsFromServer, mockNewsDataServer } from '../../../pageData/mock/news';
import { IViewNewsDataServer, InewsDataArg, INewsData } from '../../../interfaces/news';
import { ICommentData } from '../../../interfaces/common';
import { serverResolve } from '../common';
import { ERROR_ADD_COMMENT, ERROR_GET_NEWS_DATA, ERROR_GET_NEWS_LIST, getDataFromServer, restServer } from '../../../settings';

//// NEWS

export async function getNewsListFromServer( short: boolean = false ) : Promise<any>
{
    return await serverResolve( () =>
    {
        let serverData: INewsData[];  
        if( !getDataFromServer ) {
              
            if(short)
            {
                serverData = mockNewsFromServer.slice((mockNewsFromServer.length - 3), mockNewsFromServer.length);
            }
            else    
            {
                serverData= mockNewsFromServer;
            }   
            return new Promise( (resolve: Function) => { 
                setTimeout( () => {
                    resolve(serverData)
                    }, 900 )
            })
        }
        else
        {
            if(short){
                return axios.get(restServer + "newsListShort").then( (response) => {return response.data});                
            }
            else{
                return axios.get(restServer + "newsList").then( (response) => {return response.data});
            }
        }
    }, ERROR_GET_NEWS_LIST)
}

export async function getNewsDataFromServer( ID:number ) : Promise<any>
{
    return await serverResolve( () =>
    {
        if( !getDataFromServer ) {
            let serverData: IViewNewsDataServer;    
            serverData = mockNewsDataServer[ID - 1];  
            return new Promise( (resolve: Function) => { 
                setTimeout( () => {
                    resolve(serverData)
                    }, 800 )
            })
        }
        else
        {
            return axios.get(restServer + "newsData/" + ID).then( (response) => {return response.data});
        }
    }, ERROR_GET_NEWS_DATA)
}

export async function addNewsCommentToServer( newsArg: InewsDataArg ) : Promise<any>
{    
    return await serverResolve( () =>
    {
        let newComment: ICommentData = {
            Comment: newsArg.comment,
            Owner: newsArg.user.name + " " + newsArg.user.surname,
            Time: new Date().toISOString(),
            ID:123,
            OwnerID: newsArg.user.uuid
        }  
        
        if( !getDataFromServer ) {
            let serverData: IViewNewsDataServer = mockNewsDataServer[newsArg.newsID - 1];             
            serverData.comments !== null && serverData.comments !== undefined ? serverData.comments.push(newComment) : serverData.comments = [newComment];
            return new Promise( (resolve: Function) => { 
                setTimeout( () => {
                    resolve(serverData.comments)
                    }, 1000 )
            })
        }
        else
        {
            //// when using real rest server this must be adapted correctly using POST but for now:
            //// how it will work: make post with data and return updated news comment list from server
            return axios.get(restServer + "newsData/" + newsArg.newsID).then( (response) => {
                let newsData:IViewNewsDataServer = response.data;
                newsData.comments !== null && newsData.comments !== undefined ? newsData.comments.push(newComment) : newsData.comments = [newComment];
                axios.put(restServer + "newsData/" + newsArg.newsID, {...newsData});
                return newsData.comments;
            });
        }
    }, ERROR_ADD_COMMENT)
}

//// NEWS