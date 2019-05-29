import * as React from 'react';
import { Istore } from '../../../interfaces/store';
import { IAppSettings } from '../../../interfaces/appSettings';
import { connect } from 'react-redux';
import { IHomeRedux, IHomeActions} from '../../../interfaces/home';
import { changePresentationLanguage, getHomeData, resetHomeData } from '../../../store/actions/home';
import { IPageTop } from '../../../interfaces/common';

type IpresentationReduxProps = IAppSettings & IHomeActions & IHomeRedux;

function homeLogic (WrappedComponent:React.ComponentType<IPageTop>)
{
    class HomeLogic extends React.Component<IpresentationReduxProps,{}>{

        componentWillUnmount(){
            this.props.resetHomeData();
        }

        componentDidMount(){
            this.props.getHomeData(this.props.presentationLanguage);
        };

        componentDidUpdate(prevProps: IpresentationReduxProps) {
            // Typical usage (don't forget to compare props):
            if (this.props.presentationLanguage !== prevProps.presentationLanguage ) {
                this.props.changePresentationLanguage(this.props.presentationLanguage);
            }
        };

        render(){
            const presentation = this.props.presentationData;
            const homeImage = this.props.image;
            return(
                <WrappedComponent image = { homeImage } presentation = { presentation } />
            );
        }
    }
    const mapStateToProps = (state:Istore) => {
        return {
            presentationLanguage: state.appSettings.presentationLanguage,
            presentationData: state.home.presentationData,
            image: state.home.image
         };
    };

    const mapDispatchToProps = (dispatch:Function) => ({
        getHomeData: (language: string) => dispatch(getHomeData(language)),                
        changePresentationLanguage: (language: string) => dispatch(changePresentationLanguage(language)),
        resetHomeData: () => dispatch(resetHomeData())
      });
    return connect(mapStateToProps, mapDispatchToProps)(HomeLogic);
}

export default homeLogic;