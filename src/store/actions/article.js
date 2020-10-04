import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getArticleList_ = (articles) => {
    return { type: actionTypes.GET_ARTICLE_LIST, articles: articles};
};

export const getArticleList = () => {
    return dispatch => {
        return axios.get('/api/articles/')
        .then(res => dispatch(getArticleList_(res.data)));
    };
};

export const createArticle_ = (atc) => {
    return {
        type: actionTypes.CREATE_ARTICLE,
        id: atc.id,
        author_id: atc.author_id,
        title: atc.title,
        content: atc.content,
    };
}

export const createArticle = (atc) => {
    return (dispatch) => {
        return axios.post('/api/articles/', {author_id: atc.author_id, title: atc.title, content: atc.content})
        .then(res => dispatch(createArticle_(res.data)));
    };
}

export const getArticle_ = (atc) => {
    return {type: actionTypes.GET_ARTICLE, targetID: atc.id};
};

export const getArticle = (id) => {
    return dispatch => {
      return axios.get('/api/articles/' + id + "/")
        .then(res => {
          dispatch(getArticle_(res.data))
        });
    };
};

export const editArticle_ = (atc) => {
    return {type: actionTypes.EDIT_ARTICLE, article: atc};
};

export const editArticle = (atc) => {
    return dispatch => {
        return axios.put('/api/articles/' + atc.id + "/", atc)
        .then(res => {
            dispatch(editArticle_(res.data))
        });
    };
};

export const deleteArticle_ = (id) => {
    return {type: actionTypes.DELETE_ARTICLE, targetID: id};
};

export const deleteArticle = (id) => {
    return dispatch => {
        return axios.delete('/api/articles/' + id + "/")
        .then(res => {
            dispatch(deleteArticle_(res.data))
        });
    };
};