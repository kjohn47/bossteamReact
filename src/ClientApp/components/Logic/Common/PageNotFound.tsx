import * as React from 'react';
import {Route} from 'react-router-dom';
import { Istore } from '../../../interfaces/store';
import { connect } from 'react-redux';
import { IErrorHandlingText, IPageNotFoundProps } from '../../../interfaces/common';
import { TEXT_PAGE_NOT_FOUND } from '../../../settings';

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
    class PageNotFoundLogic extends React.Component<IPageNotFoundProps>{

        render(){            
            return(     
               <Status code = {404}>
                 <WrappedComponent errorTitle = { this.props.pageNotFoundText.errorTitle } errorMessage = { this.props.pageNotFoundText.errorMessage } />
               </Status>
            );
        }
    }    

    const mapStateToProps = ( state: Istore ) : IPageNotFoundProps => {
        return {       
          pageNotFoundText: state.appSettings.appText[TEXT_PAGE_NOT_FOUND]
        }
    };

    return connect( mapStateToProps, null )( PageNotFoundLogic );
}

export default pageNotFoundLogic;