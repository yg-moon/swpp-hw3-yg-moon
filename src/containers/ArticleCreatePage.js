import React, { Component } from 'react';
import * as actionCreators from '../store/actions/index';
import { connect } from 'react-redux';

class ArticleCreatePage extends Component{
    state = {
        title: '',
        content: '',
        preview_mode: false,
        article_number: 0
    }
    
    logOutHandler = () => {
        this.props.onLogOut(this.props.selectedUser);
        this.props.history.push('/login');
    }

    confirmCreateArticleHandler = (atc) => {
        let artnum_plusone = this.state.article_number + 1
        this.props.onCreateArticle(atc.id, atc.author_id, atc.title, atc.content);
        this.props.onGetArticle(artnum_plusone);
        this.props.history.push('/articles/' + artnum_plusone);
        
    }

    backCreateArticleHandler = () => {
        this.props.history.push('/articles');
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

    calcArticleNumber = () => { // New article id = current_max + 1
        let articles = this.props.articles;
        articles.map(atc => {
            if(this.state.article_number < atc.id){
                this.setState({article_number: atc.id});
            }
        }
        )
    }
    
    render(){
        // New article info
        this.calcArticleNumber();
        const newArticle = {id:this.state.article_number , author_id:this.props.selectedUser.id,
            title:this.state.title , content:this.state.content }

        // disable confirm button if content is empty
        const isEmpty = this.checkArticleEmpty();
        let confirmButton;
        if(isEmpty){
            confirmButton = <button id = 'confirm-create-article-button'
            onClick={() => this.confirmCreateArticleHandler(newArticle)} disabled>Confirm</button>
        }
        else{
            confirmButton = <button id = 'confirm-create-article-button'
            onClick={() => this.confirmCreateArticleHandler(newArticle)}>Confirm</button>
        }
        
        if(!this.state.preview_mode){ // case: write mode
            return (
                <div className="ArticleCreatePage">
                    <h1>Write your article</h1>
                    <div className = "write-buttons">
                        <button id = 'back-create-article-button' onClick={() => this.backCreateArticleHandler()}>Back</button>
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
            return (
                <div className='Preview'>
                    <h1>Preview</h1>
                    <div className = "write-buttons">
                        <button id = 'back-create-article-button' onClick={() => this.backCreateArticleHandler()}>Back</button>
                        {confirmButton}
                    </div>
                    <div className = "tab-buttons">
                        <button id = 'preview-tab-button' onClick={() => this.previewButtonHandler()}>Preview</button>
                        <button id = 'write-tab-button' onClick={() => this.writeButtonHandler()}>Write</button> 
                    </div>
                    <h2 id = "article-author">
                        Author: {this.props.selectedUser.name}
                    </h2>
                    <h2 id = "article-title">
                        Title: {this.state.title}
                    </h2>
                    <h2 id = "article-content">
                        Content: {this.state.content}
                    </h2>
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
      selectedUser: state.usr.selectedUser,
      articles: state.atc.articles
    };
}
  
const mapDispatchToProps = dispatch => {
    return {
        onLogOut: (usr) =>
            dispatch(actionCreators.updateLoginStatus(usr)),
        onCreateArticle:(id, aid, title, content) =>
            dispatch(actionCreators.createArticle({id: id, author_id: aid, title: title, content: content})),
        onGetArticle: (article_id) =>
            dispatch(actionCreators.getArticle(article_id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCreatePage);