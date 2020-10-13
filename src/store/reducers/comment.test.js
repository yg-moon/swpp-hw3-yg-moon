import React from 'react';
import reducer from './comment';
import * as actionTypes from '../actions/actionTypes';

const stubArticle = {id: 1, author_id: 1, article_id: 1, content: "TEST_COMMENT_CONTENT1"};
// actually, stubComment.

describe('Comment Reducer', () => {
    it('should return default state', () => {
        const newState = reducer(undefined, {}); // initialize
        expect(newState).toEqual({comments: [], selectedComment: {id : -1}});
      });
    
      it('should create comment', () => {
        const newState = reducer(undefined, {
          type: actionTypes.CREATE_COMMENT,
          id: stubArticle.id,
          content: stubArticle.content,
          author_id: stubArticle.author_id,
        });
        ~
        expect(newState).toEqual({
          comments: [{...stubArticle, article_id : undefined}],
          selectedComment:  {id : -1}
        });
      });
    
    //   it('should delete comment', () => {
    //     const stubInitialState = {
    //       articles: [stubArticle],
    //       selectedArticle: null,
    //     };
    //     const newState = reducer(stubInitialState, {
    //       type: actionTypes.DELETE_COMMENT,
    //       targetID: 1,
    //     });
    //     expect(newState).toEqual({
    //       comments: [],
    //       selectedComment: null
    //     });
    //   });
    
    //   it('should edit article', () => {
    //     const stubInitialState = {
    //       articles: [stubArticle],
    //       selectedArticle: null,
    //     };
    //     let newState = reducer(stubInitialState, {
    //       type: actionTypes.EDIT_ARTICLE,
    //       targetID: 1,
    //     });
    //     expect(newState).toEqual({
    //       articles: [{...stubArticle, title:stubArticle.article.title, content: stubArticle.article.content}],
    //       selectedArticle: null}
    //     );
    //   });
    
      it('should get comment', () => {
        const stubSelectedArticle = {id: 1, author_id: 1, article_id: 1, content: "TEST_COMMENT_CONTENT1"};
        const newState = reducer(undefined, {
          type: actionTypes.GET_COMMENT,
          target: stubSelectedArticle,
        });
        expect(newState).toEqual({
          comments: [],
          selectedComment: undefined,
        });
      });
    
      it('should get all comments', () => {
        const stubArticles = [
            {id: 1, author_id: 1, article_id: 1, content: "TEST_COMMENT_CONTENT1"},
            {id: 2, author_id: 2, article_id: 2, content: "TEST_COMMENT_CONTENT2"},
            {id: 3, author_id: 3, article_id: 3, content: "TEST_COMMENT_CONTENT3"},
        ];
        const newState = reducer(undefined, {
          type: actionTypes.GET_COMMENT_LIST,
          articles: stubArticles,
        });
        expect(newState).toEqual({
          comments: undefined,
          selectedComment: {id : -1},
        });
      });
})

