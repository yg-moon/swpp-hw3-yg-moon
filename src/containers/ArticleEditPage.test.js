import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import ArticleEditPage from './ArticleEditPage';
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import * as actionCreatorsUser from '../store/actions/user';
import * as actionCreatorsArticle from '../store/actions/article';

const stubInitialState = {
    users: [
        {id: 1, email: "TEST_EMAIL_1", password: "TEST_PASSWORD_1", name: "TEST_USER1", logged_in: false},
        {id: 2, email: "TEST_EMAIL_2", password: "TEST_PASSWORD_2", name: "TEST_USER2", logged_in: false},
        {id: 3, email: "TEST_EMAIL_3", password: "TEST_PASSWORD_3", name: "TEST_USER3", logged_in: false},
    ],
    selectedUser: {logged_in: true},
  
    articles: [
        {id: 1, author_id: 1, title: "TEST_ARTICLE_TITLE_1", content: "TEST_CONTENT_1"},
        {id: 2, author_id: 2, title: "TEST_ARTICLE_TITLE_2", content: "TEST_CONTENT_2"},
        {id: 3, author_id: 3, title: "TEST_ARTICLE_TITLE_3", content: "TEST_CONTENT_3"},
    ],
    selectedArticle: {author_id : 1}
  };
  
  const mockStore = getMockStore(stubInitialState);

  describe('<ArticleEditPage />', () => {
    let articleEditPage;
  
    beforeEach(() => {
      articleEditPage = (
        <Provider store={mockStore}>
          <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' component={ArticleEditPage} />
          </Switch>
          </ConnectedRouter>
        </Provider>
      );
    })

    afterEach(() => {
        jest.clearAllMocks();
    })
  
    it('should render ArticleEditPage', () => {
      const component = mount(articleEditPage);
      const wrapper = component.find('.ArticleEditPage');
      expect(wrapper.length).toBe(1);
    });

    it(`should call 'logOutHandler'`, () => {
        const spyUpdateLoginStatus = jest.spyOn(actionCreatorsUser, 'updateLoginStatus')
        .mockImplementation((usr) => { return dispatch => {}; });
        const component = mount(articleEditPage);
        const wrapper = component.find('#logout-button');
        wrapper.simulate('click');
        expect(spyUpdateLoginStatus).toHaveBeenCalledTimes(1);
    });

    it(`should call 'confirmEditArticleHandler'`, () => {
        const spyEditArticle = jest.spyOn(actionCreatorsArticle, 'editArticle')
          .mockImplementation((id, aid, title, content) => { return dispatch => {}; });
        const spyGetArticle = jest.spyOn(actionCreatorsArticle, 'getArticle')
          .mockImplementation((article_id) => { return dispatch => {}; });
        const component = mount(articleEditPage);

        let wrapper = component.find('#article-title-input');
        wrapper.simulate('change', { target: { value: "title1" } });
        wrapper = component.find('#article-content-input');
        wrapper.simulate('change', { target: { value: "content1" } });
        const articleCreatePageInstance = component.find(ArticleEditPage.WrappedComponent).instance();
        expect(articleCreatePageInstance.state.title).toEqual("title1");
        expect(articleCreatePageInstance.state.content).toEqual("content1")

        wrapper = component.find('#confirm-edit-article-button');
        wrapper.simulate('click');
        expect(spyEditArticle).toHaveBeenCalledTimes(1);
        expect(spyGetArticle).toHaveBeenCalledTimes(1);
    });

    it(`should call 'backEditArticleHandler'`, () => {
        const component = mount(articleEditPage);
        let wrapper = component.find('#back-edit-article-button');
        wrapper.simulate('click');
        wrapper = component.find('.ArticleEditPage');
        expect(wrapper.length).toBe(1);
    });

    it(`should call 'previewButtoneHandler'`, () => {
        const spyUpdateLoginStatus = jest.spyOn(actionCreatorsUser, 'updateLoginStatus')
        .mockImplementation((usr) => { return dispatch => {}; });
        const component = mount(articleEditPage);
        let wrapper = component.find('#preview-tab-button');
        wrapper.simulate('click');
        const articleEditPageInstance = component.find(ArticleEditPage.WrappedComponent).instance();
        expect(articleEditPageInstance.state.preview_mode).toEqual(true);
        wrapper.simulate('click');
        expect(articleEditPageInstance.state.preview_mode).toEqual(true);
        wrapper = component.find('#write-tab-button');
        wrapper.simulate('click');
        expect(articleEditPageInstance.state.preview_mode).toEqual(false);
        wrapper = component.find('#logout-button');
        wrapper.simulate('click');
        expect(spyUpdateLoginStatus).toHaveBeenCalledTimes(1);
    });

    it(`should call 'writeButtonHandler'`, () => {
        const spyUpdateLoginStatus = jest.spyOn(actionCreatorsUser, 'updateLoginStatus')
        .mockImplementation((usr) => { return dispatch => {}; });
        const component = mount(articleEditPage);
        let wrapper = component.find('#write-tab-button');
        wrapper.simulate('click');
        const articleEditPageInstance = component.find(ArticleEditPage.WrappedComponent).instance();
        expect(articleEditPageInstance.state.preview_mode).toEqual(false);
        wrapper.simulate('click');
        expect(articleEditPageInstance.state.preview_mode).toEqual(false);
        wrapper = component.find('#preview-tab-button');
        wrapper.simulate('click');
        expect(articleEditPageInstance.state.preview_mode).toEqual(true);
        wrapper = component.find('#back-edit-article-button');
        wrapper.simulate('click');
        wrapper = component.find('#logout-button');
        wrapper.simulate('click');
        expect(spyUpdateLoginStatus).toHaveBeenCalledTimes(1);
    });

    it(`should set state properly on title input`, () => {
        const title = 'TEST_TITLE'
        const component = mount(articleEditPage);
        const wrapper = component.find('#article-title-input');
        wrapper.simulate('change', { target: { value: title } });
        const articleEditPageInstance = component.find(ArticleEditPage.WrappedComponent).instance();
        expect(articleEditPageInstance.state.title).toEqual(title);
        expect(articleEditPageInstance.state.content).toEqual(undefined);
    });

    it(`should set state properly on content input`, () => {
        const content = 'TEST_CONTENT'
        const component = mount(articleEditPage);
        const wrapper = component.find('#article-content-input');
        wrapper.simulate('change', { target: { value: content } });
        const articleEditPageInstance = component.find(ArticleEditPage.WrappedComponent).instance();
        expect(articleEditPageInstance.state.title).toEqual(undefined);
        expect(articleEditPageInstance.state.content).toEqual(content);
    });

    it(`should set state properly on both input`, () => {
        const title = 'TEST_TITLE'
        const content = 'TEST_CONTENT'
        const component = mount(articleEditPage);
        let wrapper = component.find('#article-title-input');
        wrapper.simulate('change', { target: { value: title } });
        wrapper = component.find('#article-content-input');
        wrapper.simulate('change', { target: { value: content } });
        const articleEditPageInstance = component.find(ArticleEditPage.WrappedComponent).instance();
        expect(articleEditPageInstance.state.title).toEqual(title);
        expect(articleEditPageInstance.state.content).toEqual(content);
    });
    
  });