import * as React from 'react';
import { Istore } from '../../../interfaces/store';
import {IAppSettings} from '../../../interfaces/appSettings';
import {connect} from 'react-redux';
import {Ipresentation, IHomeRedux, IHomeActions} from '../../../interfaces/home';
import {changePresentationLanguage, getPresentationData} from '../../../store/actions/home';

type IpresentationReduxProps = IAppSettings & IHomeActions & IHomeRedux;

function presentationLogic (WrappedComponent:React.ComponentType<Ipresentation>)
{
    class PresentationLogic extends React.Component<IpresentationReduxProps,{}>{

        componentDidMount(){
            this.props.getPresentationData(this.props.presentationLanguage);
        };

        componentDidUpdate(prevProps: IpresentationReduxProps) {
            // Typical usage (don't forget to compare props):
            if (this.props.presentationLanguage !== prevProps.presentationLanguage ) {
                this.props.changePresentationLanguage(this.props.presentationLanguage);
            }
        };

        render(){
            const presentationData = this.props.presentationData;
            return(
                <WrappedComponent presentationData = {presentationData} />
            );
        }
    }
    const mapStateToProps = (state:Istore) => {
        return {
            presentationLanguage: state.appSettings.presentationLanguage,
            presentationData: state.home.presentationData
         };
    };

    const mapDispatchToProps = (dispatch:Function) => ({
        getPresentationData: (language: string) => dispatch(getPresentationData(language)),                
        changePresentationLanguage: (language: string) => dispatch(changePresentationLanguage(language))
      });
    return connect(mapStateToProps, mapDispatchToProps)(PresentationLogic);
}

export default presentationLogic;