import {combineReducers} from 'redux';
import { appSettings } from './appSettings';
import { news } from './news';
import { home } from './home';
import { registration } from './registration';
import { myAccount } from './myAccount';

const reducers = combineReducers({
    appSettings,
    news,
    home,
    registration,
    myAccount
});
    
    export default reducers;