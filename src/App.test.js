import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import App from './App';
import { getMockStore } from './test-utils/mocks';
import { history } from './store/store';
import * as actionCreatorsUser from './store/actions/user'

const stubInitialState = {
    users: [
        {id: 1, email: "TEST_EMAIL_1", password: "TEST_PASSWORD_1", name: "TEST_USER1", logged_in: false},
        {id: 2, email: "TEST_EMAIL_2", password: "TEST_PASSWORD_2", name: "TEST_USER2", logged_in: false},
        {id: 3, email: "TEST_EMAIL_3", password: "TEST_PASSWORD_3", name: "TEST_USER3", logged_in: false},
    ],
    selectedUser: {logged_in: true},
  };
  
const mockStore = getMockStore(stubInitialState);

jest.mock('./containers/ArticleListPage', () => {
  return jest.fn(props => {
    return (
      <div className="spyArticleList">
      </div>);
  });
});

describe('App', () => {
  let app, spyGetUser, spyGetUserList;

  beforeEach(() => {
    app = (
      <Provider store={mockStore}>
        <App history={history}/>
      </Provider>
    )
  });

  spyGetUser = jest.spyOn(actionCreatorsUser, 'getUser')
      .mockImplementation(() => { return dispatch => {}; });
      
  spyGetUser = jest.spyOn(actionCreatorsUser, 'getUserList')
    .mockImplementation(() => { return dispatch => {}; });

  it('should render', () => {
    const component = mount(app);
    expect(component.find('.App').length).toBe(1);
  });

  it('should be redirected to error page', () => {
    history.push('/aaa');
    const component = mount(app);
    expect(component.find('h1').text()).toBe('Not Found');
  })

  it('should render when not logged in', () => {
    const mockInitialStore = getMockStore({users: [
        {id: 1, email: "TEST_EMAIL_1", password: "TEST_PASSWORD_1", name: "TEST_USER1", logged_in: false},
        {id: 2, email: "TEST_EMAIL_2", password: "TEST_PASSWORD_2", name: "TEST_USER2", logged_in: false},
        {id: 3, email: "TEST_EMAIL_3", password: "TEST_PASSWORD_3", name: "TEST_USER3", logged_in: false},
    ],
    selectedUser: {logged_in: false},});
    const component = mount(
        <Provider store={mockInitialStore}>
            <App history={history}/>
        </Provider>
    );
    const wrapper = component.find('.App');
    expect(wrapper.length).toBe(1);
  });


});
