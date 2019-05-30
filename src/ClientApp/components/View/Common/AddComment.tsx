import {Row, Col, Spinner, Input, FormGroup, FormFeedback, Button, ToastBody, Toast} from 'reactstrap';
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
                <Col xs="12">
                    <Toast className="add-comment">
                        <ToastBody>
                            <Row>
                                <Col sm="2" xs="0" className="add-comment-inner">
                                </Col>
                                <Col xs="7" className="add-comment-inner"> 
                                <FormGroup>          
                                    <Input 
                                        type="textarea" 
                                        className="add-comment-text" 
                                        name="add_comment" 
                                        id="add_comment_input" 
                                        value = { this.props.commentValue }
                                        onChange = { ( event: any ) => this.props.handleCommentText( event ) }
                                        readOnly = { this.props.loading }
                                        invalid = { this.props.emptyComment }
                                        />
                                        <FormFeedback>
                                            {this.props.invalidCommentText}
                                        </FormFeedback>
                                </FormGroup>
                                </Col>
                                <Col sm="1" xs="5" className="add-comment-inner">
                                    {this.props.loading ? 
                                        <Spinner color="secondary" type="grow" className = "comment-spinner" />
                                    :
                                        <Button 
                                            outline 
                                            color="secondary" 
                                            className="add-comment-button" 
                                            onClick = { () => this.props.addComment() }
                                        >
                                            {this.props.submitBtnText}
                                        </Button>
                                    }
                                </Col>
                                <Col sm="2" xs="0" className="add-comment-inner">
                                </Col>
                            </Row>
                        </ToastBody>
                    </Toast>
                </Col>
            )};
}

export default AddComment;