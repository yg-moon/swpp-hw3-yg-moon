import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getCommentList_ = (cm) => {
    return { type: actionTypes.GET_COMMENT_LIST, comments: cm};
};

export const getCommentList = () => {
    return dispatch => {
        return axios.get('/api/comments/')
        .then(res => dispatch(getCommentList_(res.data)));
    };
};

export const createComment_ = (cm) => {
    return {
        type: actionTypes.CREATE_COMMENT,
        id: cm.id,
        author_id: cm.author_id,
        article_id: cm.article_id,
        content: cm.content,
    };
}

export const createComment = (cm) => {
    return (dispatch) => {
        return axios.post('/api/comments/', {author_id: cm.author_id, article_id: cm.article_id, content: cm.content})
        .then(res => dispatch(createComment_(res.data)));
    };
}

export const getComment_ = (cm) => {
    return {type: actionTypes.GET_COMMENT, targetID: cm.id};
};

export const getComment = (id) => {
    return dispatch => {
      return axios.get('/api/comments/' + id + "/")
        .then(res => {
          dispatch(getComment_(res.data))
        });
    };
};

export const editComment_ = (cm) => {
    return {type: actionTypes.EDIT_COMMENT, comment: cm};
};

export const editComment = (cm) => {
    return dispatch => {
        return axios.put('/api/comments/' + cm.id + "/", cm)
        .then(res => {
            dispatch(editComment_(res.data))
        });
    };
};

export const deleteComment_ = (id) => {
    return {type: actionTypes.DELETE_COMMENT, targetID: id};
};

export const deleteComment = (id) => {
    return dispatch => {
        return axios.delete('/api/comments/' + id + "/")
        .then(res => {
            dispatch(deleteComment_(res.data))
        });
    };
};