import * as React from 'react';
import { Row, Col, Jumbotron } from 'reactstrap';
import Image from './Image';
import { IPageTop } from '../../../interfaces/common';

class PageTop extends React.PureComponent<IPageTop,{}>{
    render(){
        return(
            <Row>
                <Col md="4" sm="12" className="HomeImageDiv">
                    <Image 
                        src={this.props.image.src} 
                        link = {this.props.image.link} 
                        alt = {this.props.image.alt} 
                        width = {this.props.image.width}
                        className = {"HomePageImage " + this.props.image.className} />
                </Col>
                <Col md="8" sm="12">
                    <Jumbotron>
                        <h1 className="display-3">{this.props.presentation.title}</h1>
                        <p className="lead">{this.props.presentation.introduction}</p>
                        <hr className="my-2" />
                        <p>{this.props.presentation.description}</p>
                    </Jumbotron>
                </Col>
            </Row>
        )};
}
export default PageTop;


