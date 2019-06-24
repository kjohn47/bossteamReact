import * as React from 'react';
import {IAppSettings} from '../../../interfaces/appSettings';
import { Istore } from '../../../interfaces/store';
import {connect} from 'react-redux';
import { getNewsList, getNewsListShort, changeNewsLanguage, resetNewsList } from '../../../store/actions/news';
import { InewsActions, InewsListRedux } from '../../../interfaces/news';
import makeCard from '../Common/makeCard';
import { ICardData, ICardItem } from '../../../interfaces/common';
import LoadingView from '../../View/Common/Loading';
import { viewsNewsRoute, LOAD_HOME_NEWS } from '../../../settings';
import PageHeader from '../../View/Common/PageHeader';

interface INewsListLoading {
    loading?: boolean;
}

type INewsReduxProps = IAppSettings & InewsActions & InewsListRedux & INewsListLoading;


function newsListLogic (WrappedComponent:React.ComponentType<ICardItem>, shortList: boolean = false): React.ComponentType
{
    class NewsListLogic extends React.Component<INewsReduxProps,{}>{
        componentWillUnmount(){
            this.props.resetNewsList();
        }
        
        componentDidMount(){
            if(shortList)
            {
                this.props.getNewsListShort(this.props.presentationLanguage);
            }
            else
            {
                this.props.getNewsList(this.props.presentationLanguage);
            }
        };

        componentDidUpdate(prevProps: INewsReduxProps) {
            // Typical usage (don't forget to compare props):
            if (this.props.presentationLanguage !== prevProps.presentationLanguage ) {
                if(shortList)
                {
                    this.props.changeNewsLanguage(this.props.presentationLanguage);
                }
                else
                {
                    this.props.changeNewsLanguage(this.props.presentationLanguage);
                }
            }
          }

        render(){
            const cardsList: ICardData[] = makeCard(this.props.newsList, viewsNewsRoute, this.props.newsLanguage.cardButtonText);
            return(
                <React.Fragment>
                    {!shortList && <PageHeader title = {this.props.newsLanguage.pageHeaderTitle}/>}
                    <div className="row">
                    <LoadingView isPageLoading = { this.props.loading } lessPriority={true}>
                        {                   
                            cardsList.map( (item:ICardData, i) => 
                                <WrappedComponent key={i} data = {item}/>
                            )                    
                        }
                    </LoadingView>
                </div>              
            </React.Fragment>  
            );
        }
    }

    const mapStateToProps = (state:Istore): IAppSettings & InewsListRedux & INewsListLoading => {
        return {
            newsLanguage: state.appSettings.newsLanguage,
            newsList: state.news.newsList,
            presentationLanguage: state.appSettings.presentationLanguage,
            loading: state.appSettings.fetchData.loading.localLoading[LOAD_HOME_NEWS]              
         };
    };

    const mapDispatchToProps = (dispatch:Function) : InewsActions => ({
        getNewsList: (language: string) => dispatch(getNewsList(language)),
        getNewsListShort: (language: string) => dispatch(getNewsListShort(language)),        
        changeNewsLanguage: (language: string) => dispatch(changeNewsLanguage(language)),
        resetNewsList: () => dispatch(resetNewsList())
      });
    return connect(mapStateToProps, mapDispatchToProps)(NewsListLogic);
}

export default newsListLogic;