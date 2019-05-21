//@ts-ignore
import { Spinner } from 'reactstrap';
import * as React from 'react';
import { ILoading } from '../../../interfaces/common';

class LoadingView extends React.PureComponent<ILoading,{}>{
    render(){
        return(
            <div className="col-md-10 col-sm-12 pageContent">
                <div className = {this.props.isGeneralLoading ? "loadingOverlay" : "" }/>   
                {this.props.isGeneralLoading &&                                   
                        <Spinner color="info" className = "loadingSpinner" />                   
                }
                {this.props.children}
            </div>
        )};
}
export default LoadingView;