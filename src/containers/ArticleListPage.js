import React, { Component } from 'react';
import { connect } from 'react-redux';

import Article from '../components/Article';
import * as actionCreators from '../store/actions/index';


class ArticleListPage extends Component{
    componentDidMount(){
        this.props.checkLoginStatus();
        this.props.onGetAllArticle();
    }

    logOutHandler = () => {
        this.props.onLogOut(this.props.selectedUser);
        this.props.history.push('/login');
    }
    
    clickTitleHandler = atc => {
        this.props.onGetArticle(atc.id); //  This shouldn't be Article component.
        this.props.history.push('/articles/' + atc.id);
    }

    createArticleHandler = () => {
        this.props.history.push('/articles/create');
    }
    
    render() {
        const articles = this.props.articles.map((atc) => {
            // Find author name for article
            let article_author_id = atc.author_id;
            let article_author_name = "";
            this.props.users.map(usr => {
                if(usr.id === article_author_id){
                    article_author_name = usr.name;
                }
            })
            return ( <Article id={atc.id} title={atc.title}
                        author={article_author_name} clicked={() => this.clickTitleHandler(atc)}/> );
        });

        return (
            <div className='ArticleListPage'>
                <h1>Article List</h1>
                <button id='create-article-button' onClick={() => this.createArticleHandler()}>Create Article</button>
                <div className='logoutButton'>
                    <button id='logout-button' onClick={() => this.logOutHandler()}>Log Out</button>
                </div>
                <div className = "LineBreak">
                    <br></br>
                </div>
                <div className='articles'>
                    {articles}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      users: state.usr.users,
      selectedUser: state.usr.selectedUser,
      articles: state.atc.articles
    };
}
  
const mapDispatchToProps = dispatch => {
    return {
        onLogOut: (usr) =>
            dispatch(actionCreators.updateLoginStatus(usr)),
        checkLoginStatus: () =>
            dispatch(actionCreators.getUser()),
        onGetAllArticle: () =>
            dispatch(actionCreators.getArticleList()),
        onGetArticle: (article_id) =>
            dispatch(actionCreators.getArticle(article_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListPage);