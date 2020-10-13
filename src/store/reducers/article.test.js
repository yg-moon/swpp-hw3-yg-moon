import React from 'react';
import reducer from './article';
import * as actionTypes from '../actions/actionTypes';

const stubArticle =  {id: 1, author_id: 1, title: "TEST_ARTICLE_TITLE_1", content: "TEST_CONTENT_1"};



describe('Article Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({articles: [], selectedArticle: {author_id : -1}});
  });

  it('should create article', () => {
    const newState = reducer(undefined, {
      type: actionTypes.CREATE_ARTICLE,
      id: stubArticle.id,
      title: stubArticle.title,
      content: stubArticle.content,
      author_id: stubArticle.author_id,
    });
    expect(newState).toEqual({
      articles: [stubArticle],
      selectedArticle:  {author_id : -1}
    });
  });

  it('should delete article', () => {
    const stubInitialState = {
      articles: [stubArticle],
      selectedArticle: null,
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.DELETE_ARTICLE,
      targetID: 1,
    });
    expect(newState).toEqual({
      articles: [],
      selectedArticle: null
    });
  });

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

  it('should get article', () => {
    const stubSelectedArticle = {id: 1, author_id: 1, title: "TEST_ARTICLE_TITLE_1", content: "TEST_CONTENT_1"};
    const newState = reducer(undefined, {
      type: actionTypes.GET_ARTICLE,
      target: stubSelectedArticle,
    });
    expect(newState).toEqual({
      articles: [],
      selectedArticle: undefined,
    });
  });

  it('should get all articles', () => {
    const stubArticles = [
        {id: 1, author_id: 1, title: "TEST_ARTICLE_TITLE_1", content: "TEST_CONTENT_1"},
        {id: 2, author_id: 2, title: "TEST_ARTICLE_TITLE_2", content: "TEST_CONTENT_2"},
        {id: 3, author_id: 3, title: "TEST_ARTICLE_TITLE_3", content: "TEST_CONTENT_3"},
    ];
    const newState = reducer(undefined, {
      type: actionTypes.GET_ARTICLE_LIST,
      articles: stubArticles,
    });
    expect(newState).toEqual({
      articles: stubArticles,
      selectedArticle: {author_id : -1},
    });
  });
})

