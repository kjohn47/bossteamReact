import {combineReducers} from 'redux';
import { appSettings } from './appSettings';
import { news } from './news';
import { home } from './home';
import { registration } from './registration';

const reducers = combineReducers({
    appSettings,
    news,
    home,
    registration
});
    
    export default reducers;