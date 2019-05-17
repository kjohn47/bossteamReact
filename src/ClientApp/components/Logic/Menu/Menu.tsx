import * as React from 'react';
import { ImenuProps, ImenuText } from "../../../interfaces/menu";
import {IAppSettings, IappActions} from '../../../interfaces/appSettings';
import { Istore } from '../../../interfaces/store';
import {connect} from 'react-redux';
import { appGetLanguage } from '../../../store/actions/appSettings';

type ImenuReduxProps = IappActions & IAppSettings;

function menuLogic (WrappedComponent:React.ComponentType<ImenuProps>)
{
    class MenuLogic extends React.Component<ImenuReduxProps,{}>{    
        componentDidMount(){
                //@ts-ignore
                this.props.appGetLanguage(this.props.presentationLanguage);
        };

        render(){
            return(
                <WrappedComponent 
                    isLogged = {this.props.isLogged} 
                    menuText = {this.props.menuText} 
                    currentUsr = {this.props.loggedUser} 
                    appGetLanguage = {this.props.appGetLanguage}/>
            );
        }
    }

    const mapStateToProps = (state:Istore) => {
        return {
            menuText: state.appSettings.menuText,
            isLogged: state.appSettings.isLogged,
            loggedUser: state.appSettings.loggedUser,
            presentationLanguage: state.appSettings.presentationLanguage
         };
    };
    return connect(mapStateToProps, {appGetLanguage})(MenuLogic);
}

export default menuLogic;