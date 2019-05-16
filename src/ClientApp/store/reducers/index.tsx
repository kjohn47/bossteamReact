import {combineReducers} from 'redux';
import { appSettings } from './appSettings';
import { news } from './news';
import { home } from './home';

const reducers = combineReducers({
    appSettings,
    news,
    home
});
    
    export default reducers;