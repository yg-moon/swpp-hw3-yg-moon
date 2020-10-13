import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import LogInPage from './LogInPage';

import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import * as actionCreatorsUser from '../store/actions/user';

const stubInitialState = {
    users: [
        {id: 1, email: "TEST_EMAIL_1", password: "TEST_PASSWORD_1", name: "TEST_USER1", logged_in: false},
        {id: 2, email: "TEST_EMAIL_2", password: "TEST_PASSWORD_2", name: "TEST_USER2", logged_in: false},
        {id: 3, email: "TEST_EMAIL_3", password: "TEST_PASSWORD_3", name: "TEST_USER3", logged_in: false},
    ],
    selectedUser: {logged_in: true},
  };
  
  const mockStore = getMockStore(stubInitialState);

  describe('<LogInPage />', () => {
    let logInPage, spyGetUser;
  
    beforeEach(() => {
      logInPage = (
        <Provider store={mockStore}>
          <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' component={LogInPage} />
          </Switch>
          </ConnectedRouter>
        </Provider>
      );
    })

    spyGetUser = jest.spyOn(actionCreatorsUser, 'getUser')
      .mockImplementation(() => { return dispatch => {}; });

    afterEach(() => {
        jest.clearAllMocks();
    })
  
    it('should render LogInPage', () => {
      const component = mount(logInPage);
      const wrapper = component.find('.LogInPage');
      expect(wrapper.length).toBe(1);
    });

    it(`should call 'logInHandler'`, () => {
        const spyUpdateLoginStatus = jest.spyOn(actionCreatorsUser, 'updateLoginStatus')
        .mockImplementation((usr) => { return dispatch => {}; });
        const component = mount(logInPage);
        const wrapper = component.find('#login-button');
        wrapper.simulate('click');
        expect(spyUpdateLoginStatus).toHaveBeenCalledTimes(0);
    });

    it(`should set state properly on input`, () => {
      const spyUpdateLoginStatus = jest.spyOn(actionCreatorsUser, 'updateLoginStatus')
        .mockImplementation((usr) => { return dispatch => {}; });
      const email = "swpp@snu.ac.kr"
      const pw = "iluvswpp"
      const component = mount(logInPage);
      let wrapper = component.find('#email-input');
      wrapper.simulate('change', { target: { value: email } });
      wrapper = component.find('#pw-input');
      wrapper.simulate('change', { target: { value: pw } });
      wrapper = component.find('#login-button');
      wrapper.simulate('click');
      expect(spyUpdateLoginStatus).toHaveBeenCalledTimes(1);
    });

  });