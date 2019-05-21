import * as React from 'react';
import Image from './View/Common/Image';
import Presentation from './View/Home/Presentation';
import NewsList from './View/News/NewsList';
import newsListLogic from './Logic/News/NewsList';
import {Row, Col} from 'reactstrap';
import homeLogic from './Logic/Home/Home';

const HomeTop = homeLogic(Presentation, Image);
const NewsListShort = newsListLogic(NewsList, true);

class Home extends React.Component{
    render(){
        return(
            <div>
                <HomeTop />
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
