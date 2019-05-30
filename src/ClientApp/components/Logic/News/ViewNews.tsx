import * as React from 'react';
import {IAppSettings} from '../../../interfaces/appSettings';
import { Istore } from '../../../interfaces/store';
import {connect} from 'react-redux';
import { getNewsData, changeNewsDataLanguage, addNewsComment, resetNewsData } from '../../../store/actions/news';
import { IViewNews, IViewNewsData, IViewNewsActions } from '../../../interfaces/news';
import { IcurrentUser } from '../../../interfaces/currentUser';

type INewsReduxProps = IAppSettings & IViewNewsActions & IViewNews;

interface viewNewsLogigProps {
    newsID?: number;
}

function viewNewsLogic (WrappedComponent:React.ComponentType<IViewNews>): React.ComponentType<viewNewsLogigProps>
{
    class ViewNewsLogic extends React.Component<INewsReduxProps,{}>{                 
        constructor(props:INewsReduxProps){
            super(props);
            this.addCommentAction = this.addCommentAction.bind(this);
        }

        componentWillUnmount(){
            this.props.resetNewsData();
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
        
        addCommentAction(comment: string) : void {
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

    const mapStateToProps = (state:Istore) : IAppSettings & IViewNews => {
        return {
            presentationLanguage: state.appSettings.presentationLanguage,
            loggedUser: state.appSettings.loggedUser,
            isLogged: state.appSettings.isLogged,
            newsData: state.news.newsViewData
         };
    };

    const mapDispatchToProps = (dispatch:Function): IViewNewsActions => ({
        getNewsData: (language: string, ID: number) => dispatch(getNewsData(language, ID)),      
        resetNewsData: () => dispatch(resetNewsData()),  
        changeNewsDataLanguage: (language: string) => dispatch(changeNewsDataLanguage(language)),
        addNewsComment: (newsID: number, Comment:string, user:IcurrentUser) => dispatch(addNewsComment(newsID, Comment, user))
      });
    return connect(mapStateToProps, mapDispatchToProps)(ViewNewsLogic);
}

export default viewNewsLogic;