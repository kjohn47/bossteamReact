import {Row, Col} from 'reactstrap';
import * as React from 'react';
import {IAddComment, IAddCommentText} from '../../../interfaces/common';
import { IAppSettings } from '../../../interfaces/appSettings';

type IAddCommentProps = IAddCommentText & IAddComment & IAppSettings;

class AddComment extends React.PureComponent<IAddCommentProps,{}>{
    constructor(props:IAddCommentProps) {
        super(props)
    };

    render(){
        return(
                <Col xs="12" className="add-comment">
                    <Row>
                        <Col xs="2" className="add-comment-inner">
                        </Col>
                        <Col xs="7" className="add-comment-inner"> 
                            <textarea 
                                className="add-comment-text" 
                                value = { this.props.commentValue }
                                onChange = { ( event: any ) => this.props.handleCommentText( event ) }
                            ></textarea>
                        </Col>
                        <Col xs="1" className="add-comment-inner">
                            <input 
                                type="button" 
                                value = {this.props.submitBtnText} 
                                className="add-comment-button" 
                                onClick = { () => this.props.addCommentAction() }
                            />
                        </Col>
                        <Col xs="2" className="add-comment-inner">
                        </Col>
                    </Row>
                </Col>
            )};
}

export default AddComment;