import { 
    GET_NEWS_LIST, 
    GET_NEWS_LIST_SHORT, 
    CHANGE_NEWS_LANGUAGE,
    GET_NEWS_DATA,
    CHANGE_NEWS_DATA_LANGUAGE 
} from '../actionTypes';
import { 
    InewsAction, 
    InewsListRedux, 
    INewsData, 
    IViewNewsDataServer, 
    IViewNewsData 
} from '../../interfaces/news';
import { IcardMainData} from '../../interfaces/common';
import {enCode} from '../../settings';
import {mockNewsDataServer, mockNewsFromServer} from '../../pageData/mock/news';

//// -- Default news state
const defaultState: InewsListRedux = {
    newsList: [],
    newsListFromServer: [],
    newsViewData: {
        id: 0,
        title: "",
        content: "",
        description:"",
        allowComments:false,
        date: new Date()
    },
    newsViewDataServer: null    
}
//// -- Default news state

//// -- News List

function getNewsListFromServer( short: boolean = false)
{
    ////mocked server data -- replace with server call
    if(short)
    {
        return mockNewsFromServer.slice((mockNewsFromServer.length - 3), mockNewsFromServer.length) 
    }

    return mockNewsFromServer;
}

function changeNewsLanguage(language:string, newsList:INewsData[]):IcardMainData[]
{
    let myNews:IcardMainData[] = [];
    newsList.forEach(news => {
        let newsTemp: IcardMainData = {
            title: language === enCode ? news.titleEN : news.title,
            description: language === enCode ? news.descriptionEN : news.description,
            date: news.date.toLocaleDateString(),
            id: news.id,
            imgLink: news.imgLink,
            outlineColor: news.outlineColor
        }
        myNews.push(newsTemp);
    });
    return myNews;
}

//// -- News List

//// -- View news data

function getNewsDataFromServer(ID:number)
{
    ////mocked server data -- replace with server call
    let serverData: IViewNewsDataServer = mockNewsDataServer[ID - 1];
    return serverData;
}

function changeNewsDataLanguage(language:string, newsServer: IViewNewsDataServer)
{
    let newsData : IViewNewsData = {
        title: language === enCode ? newsServer.titleEN : newsServer.title,
        id: newsServer.id,
        allowComments: newsServer.allowComments,
        date: newsServer.date,
        imgLink: newsServer.imgLink,
        content: language === enCode ? newsServer.contentEN : newsServer.content,
        description: language === enCode ? newsServer.descriptionEN : newsServer.description,
        comments: newsServer.comments
    };
    
    return newsData;
}

//// -- View News Data


//// -- News Reducer

export function news(state:InewsListRedux = defaultState, action:InewsAction) {

    switch (action.type) {
        case GET_NEWS_LIST: {  
            let newsListServer = getNewsListFromServer();   
            return {...state,
                 newsList: changeNewsLanguage(action.payload.language, newsListServer),
                 newsListFromServer: newsListServer
            };
        }
        case GET_NEWS_LIST_SHORT: {                 
            let newsListServer = getNewsListFromServer(true); 
            return {...state, 
                newsList: changeNewsLanguage(action.payload.language, newsListServer),
                newsListFromServer: newsListServer
            };
        }
        case CHANGE_NEWS_LANGUAGE:{
            return {...state, 
                newsList: changeNewsLanguage(action.payload.language, state.newsListFromServer)
            };
        }
        case GET_NEWS_DATA:{
            let serverData: IViewNewsDataServer = getNewsDataFromServer(action.payload.ID);
            return {...state,                
                newsViewDataServer: serverData,
                newsViewData: changeNewsDataLanguage(action.payload.language, serverData)
            };
        }
        case CHANGE_NEWS_DATA_LANGUAGE:{
                return {...state,
                    newsViewData: changeNewsDataLanguage(action.payload.language, state.newsViewDataServer)
                };        
        }

        default: 
            return state;
    }
}

//// -- News Reducer