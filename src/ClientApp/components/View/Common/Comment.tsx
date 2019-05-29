import {Row,Col, Toast, ToastHeader, ToastBody} from 'reactstrap';
import * as React from 'react';
import {ICommentData, ICommentText} from '../../../interfaces/common';

type IcommentProps = ICommentData & ICommentText;

class Comment extends React.PureComponent<IcommentProps,{}>{    
    render(){
        console.log(this.props.Mine);
        return(
            <Row className="comment-row">                
                <Col xs="12">
                    <Toast className="comment">
                        <ToastHeader icon= { this.props.Mine? "dark" : "secondary" }>
                            <div className="comment-info">{this.props.ownerText} <span>{this.props.Owner}</span></div>
                            <div className="comment-info commentDate">{this.props.dateText} <span>{new Date(this.props.Time).toLocaleString()}</span></div>
                        </ToastHeader>
                        <ToastBody>
                            {this.props.Comment}
                        </ToastBody>
                    </Toast>
                </Col>
            </Row>
            )};
}
export default Comment;