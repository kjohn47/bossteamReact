import * as React from 'react';
import { IViewNews } from '../../../interfaces/news';
import {Jumbotron, Row, Col} from 'reactstrap';
import Image from '../Common/Image';
import Comment from '../Common/Comment';
import AddComment from '../Common/AddComment';
import commentLogic from '../../Logic/Common/Comment';
import addCommentLogic from '../../Logic/Common/AddComment';

const Comments = commentLogic(Comment);

class ViewNews extends React.Component<IViewNews,{}>{    
    render(){        
        const newsData = this.props.newsData;
        const AddComments = addCommentLogic( AddComment, this.props.addCommentAction );
        return(
            <div>
                <Row>
                    <Col md="4" sm="12" className="HomeImageDiv">
                        <Image src={newsData.imgLink} link = "" alt = "News Image"  className = "HomePageImage"/>
                    </Col>
                    <Col md="8" sm="12">
                        <Jumbotron>
                            <h1 className="display-3">{newsData.title}</h1>
                            <p className="lead">{newsData.description}</p>
                            <hr className="my-2" />
                            <p>{newsData.date.toLocaleString()}</p>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" className="news-content">
                            {this.props.newsData.content}
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Comments commentList = {newsData.comments}/>
                    </Col>
                </Row>
                <Row>
                    {
                        newsData.allowComments && this.props.logedIn ? 
                            <AddComments /> 
                            : 
                            ""                   
                    }
                </Row>
            </div>
        );
    }
}
export default ViewNews;
