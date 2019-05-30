import * as React from 'react';
import {Istore} from '../../../interfaces/store';
import {connect} from 'react-redux';
import { IAppSettings } from '../../../interfaces/appSettings';

function registrationLogic( WrappedComponent: React.ComponentType<{}>) : React.ComponentType
{
    class RegistrationLogic extends React.Component<{},{}>
    {
        render(){
            return(
                <WrappedComponent />
            )
        }
    }

    const mapStateToProps = (state: Istore ): IAppSettings => {
        return {
            isLogged: state.appSettings.isLogged
        }
    }

    const mapDispatchToProps = (dispatch: Function): any => ({

    })

    return connect(mapStateToProps, mapDispatchToProps)(RegistrationLogic)
}

export default registrationLogic;