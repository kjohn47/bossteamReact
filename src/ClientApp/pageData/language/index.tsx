import { TEXT_LOGIN_MENU_OBJECT, TEXT_NEED_LOGIN_OBJECT } from "./login";
import { TEXT_COMMENT_OBJECT, TEXT_COMMENT_ADD_OBJECT } from "./comment";
import { TEXT_MENU_OBJECT } from "./menu";
import { TEXT_NEWS_LIST_OBJECT } from "./news";
import { TEXT_MY_ACCOUNT_OBJECT } from "./myAccount";
import { TEXT_REGISTRATION_OBJECT } from "./registration";
import { TEXT_PAGE_NOT_FOUND_OBJECT } from "./errors";
import { 
    TEXT_LOGIN_MENU, 
    TEXT_COMMENT, 
    TEXT_COMMENT_ADD, 
    TEXT_MENU, 
    TEXT_PAGE_NOT_FOUND, 
    TEXT_NEED_LOGIN, 
    TEXT_REGISTRATION, 
    TEXT_MY_ACCOUNT, 
    TEXT_NEWS_LIST 
    } from "../../settings";
import { GetPropertyValue } from "../../common/methods";
import { IAppText } from "../../interfaces/common";

//// Add new text translations here
export const getTranslatedText = ( language: string ): IAppText => {    
    return {
        [TEXT_PAGE_NOT_FOUND]: GetPropertyValue( TEXT_PAGE_NOT_FOUND_OBJECT, language ),
        [TEXT_MENU]: GetPropertyValue( TEXT_MENU_OBJECT, language ),
        [TEXT_NEED_LOGIN]: GetPropertyValue( TEXT_NEED_LOGIN_OBJECT, language ),
        [TEXT_LOGIN_MENU]: GetPropertyValue( TEXT_LOGIN_MENU_OBJECT, language ),
        [TEXT_REGISTRATION]: GetPropertyValue( TEXT_REGISTRATION_OBJECT, language ),
        [TEXT_MY_ACCOUNT]: GetPropertyValue( TEXT_MY_ACCOUNT_OBJECT, language ),
        [TEXT_COMMENT]: GetPropertyValue( TEXT_COMMENT_OBJECT, language ),
        [TEXT_COMMENT_ADD]: GetPropertyValue( TEXT_COMMENT_ADD_OBJECT, language ),
        [TEXT_NEWS_LIST]: GetPropertyValue( TEXT_NEWS_LIST_OBJECT, language )
    }
}