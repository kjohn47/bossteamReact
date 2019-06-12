import * as React from 'react';
import { ImenuProps } from "../../../interfaces/menu";
import { Istore } from '../../../interfaces/store';
import {connect} from 'react-redux';
import { appGetLanguage } from '../../../store/actions/appSettings';

function menuLogic (WrappedComponent:React.ComponentType<ImenuProps>): React.ComponentType
{
    class MenuLogic extends React.Component<ImenuProps,{}>{    
        componentDidMount(){
            this.props.appGetLanguage(this.props.presentationLanguage);
        };

        render(){
            return(
                <WrappedComponent 
                    isLogged = {this.props.isLogged} 
                    menuText = {this.props.menuText} 
                    currentUsr = {this.props.currentUsr} 
                    appGetLanguage = {this.props.appGetLanguage}/>
            );
        }
    }

    const mapStateToProps = (state:Istore) : ImenuProps => {
        return {
            menuText: state.appSettings.menuText,
            isLogged: state.myAccount.isLogged,
            currentUsr: state.myAccount.loggedUser,
            presentationLanguage: state.appSettings.presentationLanguage
         };
    };
    return connect(mapStateToProps, {appGetLanguage})(MenuLogic);
}

export default menuLogic;