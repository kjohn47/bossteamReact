import * as React from 'react';
import {Istore} from '../../../interfaces/store';
import {connect} from 'react-redux';
import {IAddComment, IAddCommentText} from '../../../interfaces/common';
import {IAppSettings} from '../../../interfaces/appSettings';

function addCommentLogic (WrappedComponent:React.ComponentType<IAddComment & IAddCommentText>)
{
    class AddComment extends React.Component<IAppSettings & IAddComment,{}>{
        constructor(props:any){
            super(props);
            this.addComment = this.addComment.bind(this);
        }

        addComment() {            
            this.props.addCommentAction("comment");
        }

        render(){
            return(
                <WrappedComponent 
                    addCommentAction = { this.addComment } 
                    submitBtnText = { this.props.addCommentText.submitBtnText }
                />
            );
        }
    }    

    const mapStateToProps = ( state: Istore ) => {
        return {
            addCommentText: state.appSettings.addCommentText,
        }
    };

    return connect(mapStateToProps, null)(AddComment);
}

export default addCommentLogic;