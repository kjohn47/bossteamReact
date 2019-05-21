import {IAppSettings} from './appSettings';
import {InewsListRedux} from './news';
import {IHomeRedux} from './home';
export interface Istore {
    appSettings:IAppSettings;
    news: InewsListRedux;    
    home: IHomeRedux;  
}