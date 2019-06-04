import * as React from 'react';
import { Istore } from '../../../interfaces/store';
import { connect } from 'react-redux';

function myAccountLogic ( WrappedComponent:React.ComponentType<{}> ): React.ComponentType
{
    class MyAccountLogic extends React.Component<{}>{

        render(){            
            return(     
                 <WrappedComponent />
            );
        }
    }    

    const mapDispatchToProps = ( dispatch: Function ) : any => ({

    });

    const mapStateToProps = ( state: Istore ) : any => {
        return {       
          
        }
    };

    return connect( mapStateToProps, mapDispatchToProps )( MyAccountLogic );
}

export default myAccountLogic;