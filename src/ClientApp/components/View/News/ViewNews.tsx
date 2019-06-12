import * as React from 'react';
import { IViewNews } from '../../../interfaces/news';
import { Row, Col, Toast, ToastBody} from 'reactstrap';
import Comment from '../Common/Comment';
import AddComment from '../Common/AddComment';
import commentLogic from '../../Logic/Common/Comment';
import addCommentLogic from '../../Logic/Common/AddComment';
import { Iimage, IpresentationData } from '../../../interfaces/common';
import PageTop from '../Common/PageTop';

const Comments = commentLogic(Comment);
const AddComments = addCommentLogic( AddComment );

class ViewNews extends React.PureComponent<IViewNews,{}>{        
    render(){                
        const newsData = this.props.newsData;        
        const Image: Iimage = {
            alt: newsData.title,
            src: newsData.imgLink,
            link: ''
        }
        const Presentation: IpresentationData = {
            title: newsData.title,
            introduction: newsData.description,
            description: newsData.date.toLocaleString()
        }

        return(
            <div>
                <PageTop image = {Image} presentation = {Presentation}/>
                <Row>
                    <Col xs="12" className="news-content">
                        <Toast className="news-content">
                            <ToastBody>
                                {this.props.newsData.content}
                            </ToastBody>
                        </Toast>                            
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Comments commentList = {newsData.comments}/>
                    </Col>
                </Row>
                <Row>
                    {
                        newsData.allowComments && 
                            <AddComments addCommentAction = { this.props.addCommentAction }/>                  
                    }
                </Row>
            </div>
        );
    }
}
export default ViewNews;
