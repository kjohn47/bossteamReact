import * as React from 'react';
import homeImageLogic from './Logic/Home/HomeImage';
import Image from './View/Common/Image';
import Presentation from './View/Home/Presentation';
import presentationLogic from './Logic/Home/Presentation';
import NewsList from './View/News/NewsList';
import newsListLogic from './Logic/News/NewsList';
import {Row, Col} from 'reactstrap';

const HomePresentation = presentationLogic(Presentation);
const HomeImage = homeImageLogic(Image);
const NewsListShort = newsListLogic(NewsList, true);

class Home extends React.Component{
    render(){
        return(
            <div>
                <Row>
                    <Col md="4" sm="12" className="HomeImageDiv">
                        <HomeImage />
                    </Col>
                    <Col md="8" sm="12">
                        <HomePresentation />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <NewsListShort />
                    </Col>
                </Row>
            </div>
        );
    }
}
//export default Home;

//check routes, component: comes from the routes
export default Home;
