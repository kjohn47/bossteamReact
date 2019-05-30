import * as React from 'react';
import {Route} from 'react-router-dom';
import { Istore } from '../../../interfaces/store';
import { IAppSettings } from '../../../interfaces/appSettings';
import { connect } from 'react-redux';
import { IErrorHandlingText } from '../../../interfaces/common';

//@ts-ignore
const Status = ({ code, children }) => (
    <Route render={({ staticContext }) => {
      if (staticContext)
        //@ts-ignore
        staticContext.status = code
      return children
    }}/>
  )

function pageNotFoundLogic ( WrappedComponent:React.ComponentType<IErrorHandlingText> ): React.ComponentType
{
    class PageNotFoundLogic extends React.Component<IAppSettings>{

        render(){            
            return(     
               <Status code = {404}>
                 <WrappedComponent errorTitle = { this.props.pageNotFoundText.errorTitle } errorMessage = { this.props.pageNotFoundText.errorMessage } />
               </Status>
            );
        }
    }    

    const mapStateToProps = ( state: Istore ) : IAppSettings => {
        return {       
          pageNotFoundText: state.appSettings.pageNotFoundText
        }
    };

    return connect( mapStateToProps, null )( PageNotFoundLogic );
}

export default pageNotFoundLogic;