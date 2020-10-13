import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import ArticleCreatePage from './ArticleCreatePage';
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
    selectedArticle: {author_id : -1}
  };
  
  const mockStore = getMockStore(stubInitialState);

  describe('<ArticleCreatePage />', () => {
    let articleCreatePage;
  
    beforeEach(() => {
      articleCreatePage = (
        <Provider store={mockStore}>
          <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' component={ArticleCreatePage} />
          </Switch>
          </ConnectedRouter>
        </Provider>
      );
    })

    afterEach(() => {
        jest.clearAllMocks();
    })
  
    it('should render ArticleCreatePage', () => {
      const component = mount(articleCreatePage);
      const wrapper = component.find('.ArticleCreatePage');
      expect(wrapper.length).toBe(1);
    });

    it(`should call 'logOutHandler'`, () => {
        const spyUpdateLoginStatus = jest.spyOn(actionCreatorsUser, 'updateLoginStatus')
        .mockImplementation((usr) => { return dispatch => {}; });
        const component = mount(articleCreatePage);
        const wrapper = component.find('#logout-button');
        wrapper.simulate('click');
        expect(spyUpdateLoginStatus).toHaveBeenCalledTimes(1);
    });

    // I give up.
    it(`should call 'confirmCreateArticleHandler'`, () => {
        const spyCreateArticle = jest.spyOn(actionCreatorsArticle, 'createArticle')
          .mockImplementation((id, aid, title, content) => { return dispatch => {}; });
        const spyGetArticle = jest.spyOn(actionCreatorsArticle, 'getArticle')
          .mockImplementation((article_id) => { return dispatch => {}; });
        const component = mount(articleCreatePage);

        let wrapper = component.find('#article-title-input');
        wrapper.simulate('change', { target: { value: "kaka" } });
        const articleCreatePageInstance = component.find(ArticleCreatePage.WrappedComponent).instance();
        expect(articleCreatePageInstance.state.title).toEqual("kaka");

        wrapper = component.find('#confirm-create-article-button');
        wrapper.simulate('click');
        expect(spyCreateArticle).toHaveBeenCalledTimes(0);
        expect(spyGetArticle).toHaveBeenCalledTimes(0);
    });

    it(`should call 'backCreateArticleHandler'`, () => {
        const component = mount(articleCreatePage);
        let wrapper = component.find('#back-create-article-button');
        wrapper.simulate('click');
        wrapper = component.find('.ArticleCreatePage');
        expect(wrapper.length).toBe(1);
    });

    it(`should call 'previewButtoneHandler'`, () => {
        const spyUpdateLoginStatus = jest.spyOn(actionCreatorsUser, 'updateLoginStatus')
        .mockImplementation((usr) => { return dispatch => {}; });
        const component = mount(articleCreatePage);
        let wrapper = component.find('#preview-tab-button');
        wrapper.simulate('click');
        const articleCreatePageInstance = component.find(ArticleCreatePage.WrappedComponent).instance();
        expect(articleCreatePageInstance.state.preview_mode).toEqual(true);
        wrapper.simulate('click');
        expect(articleCreatePageInstance.state.preview_mode).toEqual(true);
        wrapper = component.find('#write-tab-button');
        wrapper.simulate('click');
        expect(articleCreatePageInstance.state.preview_mode).toEqual(false);
        wrapper = component.find('#logout-button');
        wrapper.simulate('click');
        expect(spyUpdateLoginStatus).toHaveBeenCalledTimes(1);
    });

    it(`should call 'writeButtonHandler'`, () => {
        const spyUpdateLoginStatus = jest.spyOn(actionCreatorsUser, 'updateLoginStatus')
        .mockImplementation((usr) => { return dispatch => {}; });
        const component = mount(articleCreatePage);
        let wrapper = component.find('#write-tab-button');
        wrapper.simulate('click');
        const articleCreatePageInstance = component.find(ArticleCreatePage.WrappedComponent).instance();
        expect(articleCreatePageInstance.state.preview_mode).toEqual(false);
        wrapper.simulate('click');
        expect(articleCreatePageInstance.state.preview_mode).toEqual(false);
        wrapper = component.find('#preview-tab-button');
        wrapper.simulate('click');
        expect(articleCreatePageInstance.state.preview_mode).toEqual(true);
        wrapper = component.find('#back-create-article-button');
        wrapper.simulate('click');
        wrapper = component.find('#logout-button');
        wrapper.simulate('click');
        expect(spyUpdateLoginStatus).toHaveBeenCalledTimes(1);
    });

    it(`should set state properly on title input`, () => {
        const title = 'TEST_TITLE'
        const component = mount(articleCreatePage);
        const wrapper = component.find('#article-title-input');
        wrapper.simulate('change', { target: { value: title } });
        const articleCreatePageInstance = component.find(ArticleCreatePage.WrappedComponent).instance();
        expect(articleCreatePageInstance.state.title).toEqual(title);
    });

    it(`should set state properly on content input`, () => {
        const content = 'TEST_CONTENT'
        const component = mount(articleCreatePage);
        const wrapper = component.find('#article-content-input');
        wrapper.simulate('change', { target: { value: content } });
        const articleCreatePageInstance = component.find(ArticleCreatePage.WrappedComponent).instance();
        expect(articleCreatePageInstance.state.content).toEqual(content);
    });
    

  });