import { 
    GET_NEWS_LIST, 
    CHANGE_NEWS_LANGUAGE,
    GET_NEWS_DATA,
    CHANGE_NEWS_DATA_LANGUAGE,
    ADD_NEWS_COMMENT 
} from '../actionTypes';
import { 
    InewsAction, 
    InewsListRedux, 
    INewsData, 
    IViewNewsDataServer, 
    IViewNewsData, 
    Ipayload
} from '../../interfaces/news';
import { IcardMainData, ICommentData} from '../../interfaces/common';
import {enCode} from '../../settings';

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

function addCommentToNews( newsDataLocal: IViewNewsData, newsDataServer: IViewNewsDataServer, comments: ICommentData[] )
{   
    newsDataServer.comments = [...comments]; 
    newsDataLocal.comments = newsDataServer.comments;
    
    return {
        newsViewData: newsDataLocal,
        newsViewDataServer: newsDataServer
    };    
}

//// -- View News Data


//// -- News Reducer

export function news(state:InewsListRedux = defaultState, action:InewsAction) {

    switch (action.type) {
        case GET_NEWS_LIST: {  
            let newsListServer = action.payload.newsList;
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
            let serverData: IViewNewsDataServer = action.payload.newsData;
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
        case ADD_NEWS_COMMENT:{
            if ( state.newsViewData.id.toString() !== state.newsViewDataServer.id.toString() && state.newsViewData.id.toString() !== action.payload.newsID.toString() )
            {
                return {...state};
            }
            let newsViewDataState = addCommentToNews(  {...state.newsViewData}, {...state.newsViewDataServer}, action.payload.comments );
            return {...state,
                newsViewData: newsViewDataState.newsViewData,
                newsViewDataServer: newsViewDataState.newsViewDataServer
            };      
        }

        default: 
            return state;
    }
}

//// -- News Reducer