import {IAppSettings} from './appSettings';
import {InewsListRedux} from './news';
import {IHomeRedux} from './home';
import { IRegistrationReduxState } from './registration';
export interface Istore {
    appSettings:IAppSettings;
    news: InewsListRedux;    
    home: IHomeRedux;  
    registration: IRegistrationReduxState;
}