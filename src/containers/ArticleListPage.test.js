import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import ArticleListPage from './ArticleListPage';
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import * as actionCreatorsUser from '../store/actions/user';
import * as actionCreatorsArticle from '../store/actions/article';

jest.mock('../components/Article', () => {
  return jest.fn(props => {
    return (
      <div className='spyArticle'>
            {props.id}
            <button id="article-title" onClick={props.clicked}>
                {props.title}
            </button>
            <div className="Author">
                {props.author}
            </div>
            <div className="LineBreak">
                <br></br>
            </div>
       </div>);
  });
});

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

describe('<ArticleListPage />', () => {
  let articleListPage, spyGetUser, spyGetArticleList;

  beforeEach(() => {
    articleListPage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
            <Route path='/' component = {ArticleListPage} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetUser = jest.spyOn(actionCreatorsUser, 'getUser')
      .mockImplementation(() => { return dispatch => {}; });

    spyGetArticleList = jest.spyOn(actionCreatorsArticle, 'getArticleList')
      .mockImplementation(() => { return dispatch => {}; });
  })

  it('should render Articles', () => {
    const component = mount(articleListPage);
    const wrapper = component.find(".spyArticle #article-title");
    expect(wrapper.length).toBe(3);
    expect(wrapper.at(0).text()).toBe('TEST_ARTICLE_TITLE_1');
    expect(wrapper.at(1).text()).toBe('TEST_ARTICLE_TITLE_2');
    expect(wrapper.at(2).text()).toBe('TEST_ARTICLE_TITLE_3');
    expect(spyGetUser).toHaveBeenCalledTimes(1);
    expect(spyGetArticleList).toHaveBeenCalledTimes(1);
  });

  it(`should call 'logOutHandler'`, () => {
    const spyUpdateLoginStatus = jest.spyOn(actionCreatorsUser, 'updateLoginStatus')
      .mockImplementation((usr) => { return dispatch => {}; });
    const component = mount(articleListPage);
    const wrapper = component.find('#logout-button');
    wrapper.simulate('click');
    expect(spyUpdateLoginStatus).toHaveBeenCalledTimes(1);
  });

  it(`should call 'clickTitleHandler'`, () => {
    const spygetArticle = jest.spyOn(actionCreatorsArticle, 'getArticle')
      .mockImplementation((article_id) => { return dispatch => {}; });
    const component = mount(articleListPage);
    const wrapper = component.find(".spyArticle #article-title").at(0);
    wrapper.simulate('click');
    expect(spygetArticle).toHaveBeenCalledTimes(1);
  });

  it(`should call 'createArticleHandler'`, () => {
    const component = mount(articleListPage);
    const wrapper = component.find("#create-article-button");
    wrapper.simulate('click');
    expect(wrapper.length).toBe(1);
  });

  it(`should check for branch`, () => {
    const component = mount(articleListPage);
    

    

    
  });



});

