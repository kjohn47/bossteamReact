import * as React from 'react';
import Menu from './Menu';
import Footer from './View/Menu/Footer';
import errorHandlingLogic from './Logic/Common/ErrorHandling';
import ErrorHandlingView from './View/Common/ErrorHandling';
import LoadingView from './View/Common/Loading';

const ErrorHandling = errorHandlingLogic(ErrorHandlingView, LoadingView);

class Layout extends React.Component<{},{}>{
    render(){
        return(
        <div className="main-div">
            <header>
                <Menu />
            </header>
            <section className="row main-content">
                <div className="col-md-1 d-none d-md-block OuterColLayout"></div>
                    <ErrorHandling >
                        {this.props.children}
                    </ErrorHandling>
                <div className="col-md-1 d-none d-md-block  OuterColLayout"></div>
            </section>
            <div className="row separatorRow">
                <div className="col-xs-12">&nbsp;</div>
            </div>
            <footer>    
                <Footer />
            </footer>
        </div>
        );
    }
}
export default Layout;