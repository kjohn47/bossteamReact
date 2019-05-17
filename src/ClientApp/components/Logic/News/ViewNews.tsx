import * as React from 'react';
import {IAppSettings} from '../../../interfaces/appSettings';
import { Istore } from '../../../interfaces/store';
import {connect} from 'react-redux';
import { getNewsData, changeNewsDataLanguage, addNewsComment } from '../../../store/actions/news';
import { IViewNews, IViewNewsData, IViewNewsActions } from '../../../interfaces/news';
import { IcurrentUser } from '../../../interfaces/currentUser';

type INewsReduxProps = IAppSettings & IViewNewsActions & IViewNews;

function viewNewsLogic (WrappedComponent:React.ComponentType<IViewNews>)
{
    class ViewNewsLogic extends React.Component<INewsReduxProps,{}>{                 
        constructor(props:any){
            super(props);
            this.addCommentAction = this.addCommentAction.bind(this);
        }

        componentDidMount(){            
            this.props.getNewsData(this.props.presentationLanguage, this.props.newsID);
        };

        componentDidUpdate(prevProps: INewsReduxProps) {
            // Typical usage (don't forget to compare props):
            if (this.props.presentationLanguage !== prevProps.presentationLanguage ) {
                this.props.changeNewsDataLanguage(this.props.presentationLanguage);
            }
          }
        
        addCommentAction(comment: string) {
            this.props.addNewsComment(this.props.newsID, comment, this.props.loggedUser);
        }

        render(){
            const newsData : IViewNewsData = this.props.newsData;
            return(
                <WrappedComponent 
                    newsData = { newsData } 
                    newsID = {this.props.newsID}
                    addCommentAction = {this.addCommentAction}
                    logedIn = {this.props.isLogged}
                />
            );
        }
    }

    const mapStateToProps = (state:Istore) => {
        return {
            presentationLanguage: state.appSettings.presentationLanguage,
            loggedUser: state.appSettings.loggedUser,
            isLogged: state.appSettings.isLogged,
            newsData: state.news.newsViewData
         };
    };

    const mapDispatchToProps = (dispatch:Function) => ({
        getNewsData: (language: string, ID: number) => dispatch(getNewsData(language, ID)),        
        changeNewsDataLanguage: (language: string) => dispatch(changeNewsDataLanguage(language)),
        addNewsComment: (newsID: number, Comment:string, user:IcurrentUser) => dispatch(addNewsComment(newsID, Comment, user))
      });
    return connect(mapStateToProps, mapDispatchToProps)(ViewNewsLogic);
}

export default viewNewsLogic;