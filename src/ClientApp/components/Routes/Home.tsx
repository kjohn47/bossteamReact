import * as React from 'react';
import ListItem from '../View/Common/ListItem';
import newsListLogic from '../Logic/News/NewsList';
import {Row, Col} from 'reactstrap';
import homeLogic from '../Logic/Home/Home';
import PageTop from '../View/Common/PageTop';

const HomeTop = homeLogic(PageTop);
const NewsListShort = newsListLogic(ListItem, true);

class Home extends React.Component{
    render(){
        return(
            <div>
                <HomeTop />
                <Row>
                    <Col className="shortNewsList">
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
