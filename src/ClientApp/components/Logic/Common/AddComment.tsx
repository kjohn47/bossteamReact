import * as React from 'react';
import {Istore} from '../../../interfaces/store';
import {connect} from 'react-redux';
import {IAddComment, IAddCommentText} from '../../../interfaces/common';
import {IAppSettings} from '../../../interfaces/appSettings';

type IAddCommentProps = IAppSettings & IAddComment & IAddCommentText;

function addCommentLogic ( WrappedComponent:React.ComponentType<IAddCommentProps> )
{
    interface IAddCommentState {
        commentText: string;
    };  

    class AddComment extends React.Component<IAddCommentProps, IAddCommentState>{
        constructor( props:IAddCommentProps ){
            super( props );
            this.addComment = this.addComment.bind( this );
            this.handleCommentText = this.handleCommentText.bind( this );
            this.state = {
                commentText: ''
            }
        }

        addComment() {      
            if( this.state.commentText.trim() === '' )
            {
                alert( this.props.addCommentText.invalidCommentText );
            }   
            else
            {   
                this.props.addCommentAction( this.state.commentText );
                this.setState({
                    commentText: ''
            });
            }
        }

        handleCommentText( event: any ){
            this.setState({
                commentText: event.target.value
            });
        }

        render(){
            return(
                <WrappedComponent 
                    addCommentAction = { this.addComment } 
                    submitBtnText = { this.props.addCommentText.submitBtnText }
                    handleCommentText = { this.handleCommentText }
                    commentValue = { this.state.commentText }
                />
            );
        }
    }    

    const mapStateToProps = ( state: Istore ) => {
        return {
            addCommentText: state.appSettings.addCommentText,
        }
    };

    return connect( mapStateToProps, null )( AddComment );
}

export default addCommentLogic;