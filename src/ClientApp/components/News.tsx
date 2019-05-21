import * as React from 'react';
import NewsList from './View/News/NewsList';
import newsListLogic from './Logic/News/NewsList';
import {Row, Col} from 'reactstrap';

const ListNews = newsListLogic(NewsList);

class News extends React.Component{
    render(){
        return(
            <Row>
                <Col>
                    <ListNews />
                </Col>
            </Row>
        );
    }
}
export default News;
