import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from "../components/Comment";
import * as actionCreators from '../store/actions/index';

class ArticleDetailPage extends Component{
    state = {
        local_content: '',
    }

    componentDidMount = () => {
        this.props.onGetAllComments();
    }
    
    logOutHandler = () => {
        this.props.onLogOut(this.props.selectedUser);
        this.props.history.push('/login');
    }

    editArticleHandler = () => {
        let id = this.props.selectedArticle.id;
        this.props.history.push('/articles/' + id + '/edit');
    }

    deleteArticleHandler = () => {
        this.props.onDelete(this.props.selectedArticle.id);
        this.props.history.push('/articles');
    }

    backDetailArticleHandler = () => {
        this.props.history.push('/articles');
    }

    confirmCreateCommentHandler = (authid, atcid, content) => {
        this.props.onCreateComment(authid, atcid, content);
        this.setState({local_content: ''});
    }
    
    editCommentHandler = (cm) => {
        this.props.onGetComment(cm.id); // set selectedComment.
        
        let comment_to_edit = prompt("Edit your comment", cm.content);
        
        if(comment_to_edit !== null){ // user clicked OK
            if(comment_to_edit === ""){
                ; // do nothing on empty input
            }
            else{
                this.props.onEditComment({...cm, content: comment_to_edit } );
            }
        }
        // skip else: do nothing when user cancelled pop-up.
    }

    deleteCommentHandler = (id) => {
        this.props.onDeleteComment(id);
        this.props.onGetAllComments(); // refresh page
    }

    checkCommentEmpty = () => {
        if(this.state.local_content === ''){
            return true;
        }
        else{
            return false;
        }
    }

    render(){
        // disable confirm button if comment is empty
        const isEmpty = this.checkCommentEmpty();
        let cccButton;
        if(isEmpty){ 
            cccButton = <button id = 'confirm-create-comment-button' onClick={() => this.confirmCreateCommentHandler()} disabled>Confirm Comment</button>
        }
        else{
            cccButton = <button id = 'confirm-create-comment-button' onClick={() => this.confirmCreateCommentHandler(
                this.props.selectedUser.id, this.props.selectedArticle.id, this.state.local_content
            )}>Confirm Comment</button>
        }

        // render buttons only when comment author matches
        const comments = this.props.comments.map((cm) => {
            let is_comment_author = false; // DEBUG: true
            if(this.props.selectedUser.id === cm.author_id){
                is_comment_author = true;
            }
            let edit_comment_button, delete_comment_button;
            if(is_comment_author){ 
                edit_comment_button = <button id = 'edit-comment-button' onClick={() => this.editCommentHandler(cm)}>Edit Comment</button>;
                delete_comment_button = <button id = 'delete-comment-button' onClick={() => this.deleteCommentHandler(cm.id)}>Delete Comment</button>;
            }
            if(this.props.selectedArticle.id === cm.article_id){ // render comments only when article id matches
                // Find author name for comment
                let article_author_id = cm.author_id;
                let comment_author_name = "";
                this.props.users.map(usr => {
                    if(usr.id === article_author_id){
                        comment_author_name = usr.name;
                    }
                })
                return ( <Comment author={comment_author_name} comment={cm.content}
                    edit_button={edit_comment_button} delete_button={delete_comment_button} /> );
            }
        });
        
        // render buttons only when article author matches
        let is_article_author = false; // DEBUG: true
        if(this.props.selectedUser.id === this.props.selectedArticle.author_id){
            is_article_author = true;
        }
        let edit_article_button, delete_article_button;
        if(is_article_author){ 
            edit_article_button = <button id = 'edit-article-button' onClick={() => this.editArticleHandler()}>Edit Article</button>
            delete_article_button =  <button id = 'delete-article-button' onClick={() => this.deleteArticleHandler()}>Delete Article</button>
        }

        // Find author name for article
        let article_author_id = this.props.selectedArticle.author_id;
        let article_author_name = "";
        this.props.users.map(usr => {
            if(usr.id === article_author_id){
                article_author_name = usr.name;
            }
        })

        return(
            <div className='ArticleDetailPage'>
                <h1>Article Detail</h1>
                <h3 id = "article-author">
                    Author: {article_author_name}
                </h3>
                <h3 id = "article-title">
                    Title: {this.props.selectedArticle.title}
                </h3>
                <p id = "article-content">
                    Content: {this.props.selectedArticle.content}
                </p>
                <div className = "article buttons">
                    {edit_article_button}
                    {delete_article_button}
                </div>
                <div className = "back button">
                    <button id = 'back-detail-article-button' onClick={() => this.backDetailArticleHandler()}>Back to Article List</button>
                </div>
                <div className="LineBreak">
                    <br></br>
                </div>
                Comment:
                <input id = "new-comment-content-input" type="text" value={this.state.local_content}
                    onChange={(event) => this.setState({ local_content: event.target.value })} />
                <div className = "comment buttons">
                    {cccButton}
                </div>
                <div className="LineBreak">
                    <br></br>
                </div>
                {comments}
                <div className='logoutButton'>
                    <button id='logout-button' onClick={() => this.logOutHandler()}>Log Out</button>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
      users: state.usr.users,
      selectedUser: state.usr.selectedUser,
      selectedArticle: state.atc.selectedArticle,
      comments: state.cmm.comments,
      selectedComment: state.cmm.selectedComment,
    };
}
  
const mapDispatchToProps = dispatch => {
    return {
        onLogOut: (usr) =>
            dispatch(actionCreators.updateLoginStatus(usr)),
        onDelete: (id) =>
            dispatch(actionCreators.deleteArticle(id)),
        onGetAllComments: () =>
            dispatch(actionCreators.getCommentList()),
        onCreateComment: (authid, atcid, content) =>
            dispatch(actionCreators.createComment({author_id: authid, article_id: atcid, content: content})),
        onGetComment: (id) =>
            dispatch(actionCreators.getComment(id)),
        onEditComment: (cm) =>
            dispatch(actionCreators.editComment(cm)),
        onDeleteComment: (id) =>
            dispatch(actionCreators.deleteComment(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetailPage);