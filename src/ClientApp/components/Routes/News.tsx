import * as React from 'react';
import ListItem from '../View/Common/ListItem';
import newsListLogic from '../Logic/News/NewsList';
import {Row, Col} from 'reactstrap';

const ListNews = newsListLogic(ListItem);

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
