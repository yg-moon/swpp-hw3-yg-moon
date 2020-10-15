import React from 'react';
import reducer from './comment';
import * as actionTypes from '../actions/actionTypes';

const stubComment = {id: 1, author_id: 1, article_id: 1, content: "TEST_COMMENT_CONTENT1"};
const stubComment2 = {id: 2, author_id: 2, article_id: 2, content: "TEST_COMMENT_CONTENT2"};

describe('Comment Reducer', () => {
    it('should return default state', () => {
        const newState = reducer(undefined, {}); // initialize
        expect(newState).toEqual({comments: [], selectedComment: {id : -1}});
      });
    
      it('should create comment', () => {
        const newState = reducer(undefined, {
          type: actionTypes.CREATE_COMMENT,
          id: stubComment.id,
          content: stubComment.content,
          author_id: stubComment.author_id,
        });
        
        expect(newState).toEqual({
          comments: [{...stubComment, article_id : undefined}],
          selectedComment:  {id : -1}
        });
      });
    
      it('should delete comment', () => {
        const stubInitialState = {
          comments: [stubComment],
          selectedComment: null,
        };
        const newState = reducer(stubInitialState, {
          type: actionTypes.DELETE_COMMENT,
          targetID: 1,
        });
        expect(newState).toEqual({
          comments: [],
          selectedComment: null
        });
      });
    
      it('should edit comment', () => {
        const stubInitialState = {
          comments: [stubComment],
          selectedComment: null,
        };
        let newState = reducer(stubInitialState, {
          type: actionTypes.EDIT_COMMENT,
          comment: stubComment
        });
        expect(newState).toEqual({
          comments: [{...stubComment, content: stubComment.content}],
          selectedComment: null}
        );
      });

      it('should edit comment2', () => {
        const stubInitialState = {
          comments: [stubComment2],
          selectedComment: null,
        };
        let newState = reducer(stubInitialState, {
          type: actionTypes.EDIT_COMMENT,
          comment: stubComment
        });
        expect(newState).toEqual({
          comments: [stubComment2],
          selectedComment: null}
        );
      });
    
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

