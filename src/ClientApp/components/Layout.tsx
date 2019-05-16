import * as React from 'react';
import Menu from './Menu';
import Footer from './View/Menu/Footer';

class Layout extends React.Component<{},{}>{
    render(){
        return(
        <div className="main-div">
            <header>
                <Menu />
            </header>
            <section className="row main-content">
                <div className="col-md-1 hidden-sm OuterColLayout"></div>
                <div className="col-md-10 col-sm-12 pageContent">
                    {this.props.children}
                </div>
                <div className="col-md-1 hidden-sm OuterColLayout"></div>
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