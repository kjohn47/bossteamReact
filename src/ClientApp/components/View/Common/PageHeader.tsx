import * as React from 'react';
import { Row, Col } from 'reactstrap';
import { IPageHeader } from '../../../interfaces/common';

class PageHeader extends React.PureComponent<IPageHeader,{}>{
    render(){
        return(
            <Row>
                <Col xs="12">
                    <div className="pageHeader">{this.props.title}</div>
                </Col>
            </Row>
        )};
}
export default PageHeader;