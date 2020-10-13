import React from 'react';

import reducer from './user';
import * as actionTypes from '../actions/actionTypes';

const stubUser = {
    id: 1,
    email: "TEST_EMAIL_1",
    password: "TEST_PASSWORD_1",
    name: "TEST_USER1",
    logged_in: false,
};

describe('User Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({users: [], selectedUser: {logged_in:true}});
  });

  it('should get user', () => {
    const stubSelectedUser = {id: 1,
        email: "TEST_EMAIL_1",
        password: "TEST_PASSWORD_1",
        name: "TEST_USER1",
        logged_in: false,
    };
    const newState = reducer(undefined, {
      type: actionTypes.GET_USER,
      target: stubSelectedUser,
    });
    expect(newState).toEqual({
      users: [],
      selectedUser: stubSelectedUser
    });
  });

  it('should get all users', () => {
    const stubUsers = [
            {id: 1, email: "TEST_EMAIL_1", password: "TEST_PASSWORD_1", name: "TEST_USER1", logged_in: false},
            {id: 2, email: "TEST_EMAIL_2", password: "TEST_PASSWORD_2", name: "TEST_USER2", logged_in: false},
            {id: 3, email: "TEST_EMAIL_3", password: "TEST_PASSWORD_3", name: "TEST_USER3", logged_in: false},
    ];
    const newState = reducer(undefined, {
      type: actionTypes.GET_USER_LIST,
      users: stubUsers,
    });
    expect(newState).toEqual({
      users: stubUsers,
      selectedUser: {logged_in:true},
    });
  });

  it('should get update login status', () => {
    const stubSelectedUser = {id: 1,
        email: "TEST_EMAIL_1",
        password: "TEST_PASSWORD_1",
        name: "TEST_USER1",
        logged_in: false,
    };
    const newState = reducer(undefined, {
      type: actionTypes.UPDATE_LOGIN_STATUS,
      targetID: stubSelectedUser.id,
    });
    expect(newState).toEqual({
      users: [],
      selectedUser: {logged_in: true}
    });
  });

})

