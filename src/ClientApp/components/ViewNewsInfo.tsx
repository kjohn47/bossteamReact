import * as React from 'react';
import ViewNews from './View/News/ViewNews';
import viewNewsLogic from './Logic/News/ViewNews';
import {Row, Col} from 'reactstrap';

const NewsView = viewNewsLogic(ViewNews);

class ViewNewsInfo extends React.Component<{match?:any},{}>{
    render(){
        return(
            <div>
                <Row>
                    <Col>
                        <NewsView newsID = {this.props.match.params.ID}/>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default ViewNewsInfo;
