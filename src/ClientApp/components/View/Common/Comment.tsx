import {Row,Col} from 'reactstrap';
import * as React from 'react';
import {ICommentData, ICommentText} from '../../../interfaces/common';

type IcommentProps = ICommentData & ICommentText;

class Comment extends React.PureComponent<IcommentProps,{}>{
    render(){
        return(
            <Row className="comment-row">
                <Col xs="2" className="comment comment-info-col">
                    <div className="comment-info">{this.props.ownerText} <span>{this.props.Owner}</span></div>
                    <div className="comment-info">{this.props.dateText} <span>{this.props.Time.toLocaleString()}</span></div>
                </Col>
                <Col xs="10" className="comment">
                    {this.props.Comment}
                </Col>
            </Row>
            )};
}
export default Comment;