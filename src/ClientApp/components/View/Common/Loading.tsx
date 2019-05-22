//@ts-ignore
import { Spinner } from 'reactstrap';
import * as React from 'react';
import { ILoading } from '../../../interfaces/common';

class LoadingView extends React.PureComponent<ILoading,{}>{
    render(){
        const overlayClasses = this.props.isPageLoading ? "loadingOverlay" + (this.props.lessPriority ? " loadingOverlayLess" : "") : "";
        const spinnerClasses = "loadingSpinner" + (this.props.lessPriority ? " loadingSpinnerLess" : "");      

        return(
            <React.Fragment>
                <div className = {overlayClasses }/>   
                {this.props.isPageLoading &&                                   
                        <Spinner color="secondary" className = {spinnerClasses} />                   
                }
                {this.props.children}
            </React.Fragment>
        )};
}
export default LoadingView;