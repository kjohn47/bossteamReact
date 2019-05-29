import * as React from 'react';
import {Istore} from '../../../interfaces/store';
import {connect} from 'react-redux';
import {ICommentData, ICommentText} from '../../../interfaces/common';

interface ICommentArray {
    commentList: ICommentData[];
    commentText?: ICommentText;
    userUUID?: string;
};

type IcommentProps = ICommentData & ICommentText;

function commentLogic (WrappedComponent:React.ComponentType<IcommentProps>)
{
    class Comment extends React.Component<ICommentArray,{}>{
        render(){
            const comments = this.props.commentList;
            return(
                <div>
                    {
                        comments !== null && comments !== undefined &&
                            comments.map( (item:ICommentData, i) =>                
                                <WrappedComponent 
                                    key = {i} 
                                    ID = {item.ID} 
                                    Comment = {item.Comment} 
                                    Owner ={item.Owner} 
                                    Time = {item.Time}   
                                    ownerText = {this.props.commentText.ownerText}
                                    dateText = {this.props.commentText.dateText}     
                                    Mine = {this.props.userUUID === item.OwnerID}                     
                                />                                
                            )
                    }
                </div>
            );
        }
    }
    
    const mapStateToProps = ( state: Istore ) => {
        return {
            commentText: state.appSettings.commentText,
            userUUID: state.appSettings.loggedUser !== null && state.appSettings.loggedUser !== undefined ? state.appSettings.loggedUser.uuid : ''
        }
    };
    
    return connect(mapStateToProps, null)(Comment);
}

export default commentLogic;