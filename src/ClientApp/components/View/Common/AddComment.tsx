import {Row, Col} from 'reactstrap';
import * as React from 'react';
import {IAddComment, IAddCommentText} from '../../../interfaces/common';

class AddComment extends React.Component<IAddComment & IAddCommentText,{}>{
    constructor(props:any) {
        super(props)
    };

    render(){
        return(
                <Col xs="12" className="add-comment">
                    <Row>
                        <Col xs="2" className="add-comment-inner">
                        </Col>
                        <Col xs="7" className="add-comment-inner"> 
                            <textarea className="add-comment-text"></textarea>
                        </Col>
                        <Col xs="1" className="add-comment-inner">
                            <input type="submit" value = {this.props.submitBtnText} className="add-comment-button"/>
                        </Col>
                        <Col xs="2" className="add-comment-inner">
                        </Col>
                    </Row>
                </Col>
            )};
}

export default AddComment;