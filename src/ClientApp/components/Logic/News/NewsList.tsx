import * as React from 'react';
import {IAppSettings} from '../../../interfaces/appSettings';
import { Istore } from '../../../interfaces/store';
import {connect} from 'react-redux';
import { getNewsList, getNewsListShort, changeNewsLanguage } from '../../../store/actions/news';
import { InewsCard, InewsActions, InewsListRedux } from '../../../interfaces/news';
import makeCard from '../Common/makeCard';
import { ICardData } from '../../../interfaces/common';
import LoadingView from '../../View/Common/Loading';

interface INewsListLoading {
    loading?: boolean;
}

type INewsReduxProps = IAppSettings & InewsActions & InewsListRedux & INewsListLoading;


function newsListLogic (WrappedComponent:React.ComponentType<InewsCard>, shortList: boolean = false)
{
    class NewsListLogic extends React.Component<INewsReduxProps,{}>{    
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
            const cardsList: ICardData[] = makeCard(this.props.newsList, '/ViewNews', this.props.newsLanguage.cardButtonText);
            return(
                <div className="row">
                 <LoadingView isPageLoading = { this.props.loading } lessPriority={true}>
                    {                   
                        cardsList.map( (item:ICardData, i) => 
                            <WrappedComponent key={i} newsCard = {item}/>
                        )                    
                    }
                </LoadingView>
            </div>                
            );
        }
    }

    const mapStateToProps = (state:Istore) => {
        return {
            newsLanguage: state.appSettings.newsLanguage,
            newsList: state.news.newsList,
            presentationLanguage: state.appSettings.presentationLanguage,
            loading: state.appSettings.fetchData.loading.localLoading.loadHomeNews     
         };
    };

    const mapDispatchToProps = (dispatch:Function) => ({
        getNewsList: (language: string) => dispatch(getNewsList(language)),
        getNewsListShort: (language: string) => dispatch(getNewsListShort(language)),        
        changeNewsLanguage: (language: string) => dispatch(changeNewsLanguage(language))
      });
    return connect(mapStateToProps, mapDispatchToProps)(NewsListLogic);
}

export default newsListLogic;