import * as React from 'react';
import {Istore} from '../../../interfaces/store';
import {connect} from 'react-redux';
import {IAddComment, IAddCommentText} from '../../../interfaces/common';
import {IAppSettings} from '../../../interfaces/appSettings';

function addCommentLogic (WrappedComponent:React.ComponentType<IAddComment & IAddCommentText>, action: Function)
{
    class AddComment extends React.Component<IAppSettings,{}>{
        render(){
            return(
                <WrappedComponent 
                    action = {action} 
                    submitBtnText = {this.props.addCommentText.submitBtnText}
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