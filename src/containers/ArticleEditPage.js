import React, { Component } from 'react';
import * as actionCreators from '../store/actions/index';
import { connect } from 'react-redux';

class ArticleEditPage extends Component{
    state = {
        title: 'example title',
        content: 'example content',
        preview_mode: false,
        original_title: '',
        original_content: ''
    }

    // Set title and content to edit.
    componentDidMount = () => {
        this.setState({title: this.props.selectedArticle.title});
        this.setState({content: this.props.selectedArticle.content});
        this.setState({original_title: this.props.selectedArticle.title});
        this.setState({original_content: this.props.selectedArticle.content});
    }

    logOutHandler = () => {
        this.props.onLogOut(this.props.selectedUser);
        this.props.history.push('/login');
    }
    
    confirmEditArticleHandler = (id, aid, title, content) => {
        this.props.history.push('/articles/' + id);
        this.props.onEditArticle(id, aid, title, content);
        this.props.onGetArticle(id);
        
    }

    backEditArticleHandler = () => {
        // if title, content is untouched, execute this.props.history.goBack()
        if(this.state.title === this.state.original_title && this.state.content === this.state.original_content){
            this.props.history.push('/articles/' + this.props.selectedArticle.id);
        }
        else{ // if title, content is changed
            let confirm_message = window.confirm("Are you sure? The change will be lost");
            if(confirm_message){ // user accepts
                this.props.history.push('/articles/' + this.props.selectedArticle.id);
            }
            // no else statement: if user dismisses, do nothing.
        }
    }

    previewButtonHandler = () => {
        this.setState( {preview_mode: true} )
    }

    writeButtonHandler = () => {
        this.setState( {preview_mode: false} )
    }

    checkArticleEmpty = () => {
        if(this.state.title === '' || this.state.content === ''){
            return true;
        }
        else{
            return false;
        }
    }
    
    render(){
        // disable confirm button if content is empty
        const isEmpty = this.checkArticleEmpty();
        let confirmButton;
        if(isEmpty){ 
            confirmButton = <button id = 'confirm-edit-article-button'
            onClick={() => this.confirmEditArticleHandler(this.props.selectedArticle.id, this.props.selectedArticle.author_id,
                this.state.title, this.state.content
                )} disabled>Confirm Edit</button>
        }
        else{
            confirmButton = <button id = 'confirm-edit-article-button'
            onClick={() => this.confirmEditArticleHandler(this.props.selectedArticle.id, this.props.selectedArticle.author_id,
                this.state.title, this.state.content)}>Confirm Edit</button>
        }

        if(!this.state.preview_mode){ // case: write mode
            return(
            <div className = "ArticleEditPage">
                <h1>Edit your article</h1>
                <div className = "write-buttons">
                    <button id = 'back-edit-article-button' onClick={() => this.backEditArticleHandler()}>Back</button>
                    {confirmButton}
                </div>
                <div className = "tab-buttons">
                    <button id = 'preview-tab-button' onClick={() => this.previewButtonHandler()}>Preview</button>
                    <button id = 'write-tab-button' onClick={() => this.writeButtonHandler()}>Write</button>  
                </div>
                <label>Title</label>
                <input id = "article-title-input" type="text" value={this.state.title}
                onChange={(event) => this.setState({ title: event.target.value })} />
                <label>Content</label>
                <textarea id = "article-content-input" rows="4" type="text" value={this.state.content}
                onChange={(event) => this.setState({ content: event.target.value })} />
                <div className='logoutButton'>
                        <button id='logout-button' onClick={() => this.logOutHandler()}>Log Out</button>
                </div>
            </div>
            );
        }
        else{ // case: preview mode
            // Find author name
            let article_author_id = this.props.selectedArticle.author_id;
            let name = "";
            this.props.users.map(usr => {
                if(usr.id === article_author_id){
                    name = usr.name;
                }
            })
            return (
                <div className='Preview'>
                    <h1>Preview</h1>
                    <div className = "write-buttons">
                        <button id = 'back-edit-article-button' onClick={() => this.backEditArticleHandler()}>Back</button>
                        {confirmButton}
                    </div>
                    <div className = "tab-buttons">
                        <button id = 'preview-tab-button' onClick={() => this.previewButtonHandler()}>Preview</button>
                        <button id = 'write-tab-button' onClick={() => this.writeButtonHandler()}>Write</button>  
                    </div>
                    <h3 id = "article-author">
                        Author: {name}
                    </h3>
                    <h3 id = "article-title">
                        Title: {this.state.title}
                    </h3>
                    <p id = "article-content">
                        Content: {this.state.content}
                    </p>
                    <div className='logoutButton'>
                        <button id='logout-button' onClick={() => this.logOutHandler()}>Log Out</button>
                    </div>
                </div>
            );
        }
        
    }

}

const mapStateToProps = state => {
    return {
      users: state.usr.users,
      selectedUser: state.usr.selectedUser,
      articles: state.atc.articles,
      selectedArticle: state.atc.selectedArticle
    };
}
  
const mapDispatchToProps = dispatch => {
    return {
        onLogOut: (usr) =>
            dispatch(actionCreators.updateLoginStatus(usr)),
        onEditArticle:(id, aid, title, content) =>
            dispatch(actionCreators.editArticle({id: id, author_id: aid, title: title, content: content})),
        onGetArticle: (article_id) =>
            dispatch(actionCreators.getArticle(article_id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEditPage);