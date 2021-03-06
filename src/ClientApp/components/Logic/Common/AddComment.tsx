import * as React from 'react';
import {Istore} from '../../../interfaces/store';
import {connect} from 'react-redux';
import {IAddComment, IAddCommentText, IAddCommentAction} from '../../../interfaces/common';
import { LOAD_NEW_COMMENT, TEXT_COMMENT_ADD } from '../../../settings';

type IAddCommentProps = IAddComment & IAddCommentText & IAddCommentAction;

function addCommentLogic ( WrappedComponent:React.ComponentType<IAddCommentProps> ) : React.ComponentType<IAddCommentAction>
{
    interface IAddCommentState {
        commentText: string;
        emptyComment:boolean;
    };  

    class AddComment extends React.Component<IAddCommentProps, IAddCommentState>{
        constructor( props:IAddCommentProps ){
            super( props );
            this.addComment = this.addComment.bind( this );
            this.handleCommentText = this.handleCommentText.bind( this );
            this.state = {
                commentText: '',
                emptyComment: false
            }
        }

        addComment() : void {      
            if( this.state.commentText.trim() === '' )
            {
                this.setState({
                    emptyComment: true
                })
            }   
            else
            {   
                this.props.addCommentAction( this.state.commentText );
                this.setState({
                    commentText: ''
                });
            }
        }

        handleCommentText( event: React.FormEvent<HTMLInputElement> ) : void {
            this.setState({
                emptyComment:false,
                commentText: event.currentTarget.value
            });
        }

        render(){
            return(
                this.props.isLogged && this.props.loggedUser.enabled ? 
                <WrappedComponent 
                    addComment = { this.addComment } 
                    submitBtnText = { this.props.addCommentText.submitBtnText }
                    handleCommentText = { this.handleCommentText }
                    commentValue = { this.state.commentText }
                    loading = { this.props.loading }
                    invalidCommentText = { this.props.addCommentText.invalidCommentText }
                    emptyComment = { this.state.emptyComment }
                />
                :
                null
            );
        }
    }

    const mapStateToProps = ( state: Istore ) : IAddCommentProps => {
        return {
            addCommentText: state.appSettings.appText[TEXT_COMMENT_ADD],
            loading: state.appSettings.fetchData.loading.localLoading[LOAD_NEW_COMMENT],
            loggedUser: state.myAccount.loggedUser,            
            isLogged: state.myAccount.isLogged
        }
    };

    return connect( mapStateToProps, null )( AddComment );
}

export default addCommentLogic;