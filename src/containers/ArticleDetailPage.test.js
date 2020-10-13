import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import ArticleDetailPage from './ArticleDetailPage';
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import * as actionCreatorsUser from '../store/actions/user';
import * as actionCreatorsArticle from '../store/actions/article';
import * as actionCreatorsComment from '../store/actions/comment';

const stubInitialState = {
    users: [
        {id: 1, email: "TEST_EMAIL_1", password: "TEST_PASSWORD_1", name: "TEST_USER1", logged_in: false},
    ],
    selectedUser: {id:1, logged_in: true},
  
    articles: [
        {id: 1, author_id: 1, title: "TEST_ARTICLE_TITLE_1", content: "TEST_CONTENT_1"},
    ],
    selectedArticle: {author_id : 1},

    comments: [
        {id: 1, author_id: 1, article_id: 1, content: "TEST_COMMENT_CONTENT1"},
    ],
    selectedComment: {id : 1, author_id: 1},
  };

  
  const mockStore = getMockStore(stubInitialState);


  describe('<ArticleDetailPage />', () => {
    let articleDetailPage, spyGetCommentList;
  
    beforeEach(() => {
      articleDetailPage = (
        <Provider store={mockStore}>
          <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' component={ArticleDetailPage} />
          </Switch>
          </ConnectedRouter>
        </Provider>
      );

      spyGetCommentList = jest.spyOn(actionCreatorsComment, 'getCommentList')
        .mockImplementation(() => { return dispatch => {}; });
    })

    afterEach(() => {
        jest.clearAllMocks();
    })
  
    it('should render ArticleDetailPage', () => {
      const component = mount(articleDetailPage);
      const wrapper = component.find('.ArticleDetailPage');
      expect(wrapper.length).toBe(1);
    });

    it(`should call 'logOutHandler'`, () => {
        const spyUpdateLoginStatus = jest.spyOn(actionCreatorsUser, 'updateLoginStatus')
        .mockImplementation((usr) => { return dispatch => {}; });
        const component = mount(articleDetailPage);
        const wrapper = component.find('#logout-button');
        wrapper.simulate('click');
        expect(spyUpdateLoginStatus).toHaveBeenCalledTimes(1);
    });

    it(`should call 'deleteArticleHandler'`, () => {
        const spyDeleteArticle = jest.spyOn(actionCreatorsArticle, 'deleteArticle')
        .mockImplementation((id) => { return dispatch => {}; });
        const component = mount(articleDetailPage);
        const wrapper = component.find('#delete-article-button');
        wrapper.simulate('click');
        expect(spyDeleteArticle).toHaveBeenCalledTimes(1);
    });

    // it(`should call 'confirmCreateCommentHandler'`, () => {
    //     const spyCreateComment = jest.spyOn(actionCreatorsComment, 'createComment')
    //     .mockImplementation((authid, atcid, content) => { return dispatch => {}; });
    //     const component = mount(articleDetailPage);
    //     const wrapper = component.find('#confirm-create-comment-button');
    //     wrapper.simulate('click');
    //     expect(spyCreateComment).toHaveBeenCalledTimes(1);
    // });

    // it(`should call 'editCommentHandler'`, () => {
    //     const spyGetComment = jest.spyOn(actionCreatorsComment, 'getComment')
    //     .mockImplementation((id) => { return dispatch => {}; });
    //     const component = mount(articleDetailPage);
    //     const wrapper = component.find('#edit-comment-button');
    //     wrapper.simulate('click');
    //     expect(spyGetComment).toHaveBeenCalledTimes(1);
    // });

    // it(`should call 'deleteCommentHandler'`, () => {
    //     const spyDeleteComment = jest.spyOn(actionCreatorsComment, 'deleteComment')
    //     .mockImplementation((id) => { return dispatch => {}; });
    //     const component = mount(articleDetailPage);
    //     const wrapper = component.find('#delete-comment-button');
    //     wrapper.simulate('click');
    //     expect(spyDeleteComment).toHaveBeenCalledTimes(1);
    // });

    it(`should call 'editArticleHandler'`, () => {
        const component = mount(articleDetailPage);
        let wrapper = component.find('#edit-article-button');
        wrapper.simulate('click');
        wrapper = component.find('.ArticleDetailPage');
        expect(wrapper.length).toBe(1);
    });

    it(`should call 'backDetailArticleHandler'`, () => {
        const component = mount(articleDetailPage);
        let wrapper = component.find('#back-detail-article-button');
        wrapper.simulate('click');
        wrapper = component.find('.ArticleDetailPage');
        expect(wrapper.length).toBe(1);
    });

    it(`should set state properly on content input`, () => {
        const component = mount(articleDetailPage);
        const wrapper = component.find('#new-comment-content-input');
        const content = 'TEST_CONTENT'
        wrapper.simulate('change', { target: { value: content } });
        const articleDetailPageInstance = component.find(ArticleDetailPage.WrappedComponent).instance();
        expect(articleDetailPageInstance.state.local_content).toEqual(content);
    });

  });