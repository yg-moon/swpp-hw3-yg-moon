import axios from 'axios';
import * as actionCreators from './user';
import store from '../store';

const stubUser = {
    id: 1,
    email: "TEST_EMAIL_1",
    password: "TEST_PASSWORD_1",
    name: "TEST_USER1",
    logged_in: false,
};

describe('ActionCreatorsUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })
  
  it(`'getUserList' should fetch userlist correctly`, (done) => {
    const stubUserList = [stubUser];

    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubUserList
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.getUserList()).then(() => {
      const newState = store.getState();
      expect(newState.usr.users).toBe(stubUserList);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'getUser' should fetch user correctly`, (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubUser
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.getUser()).then(() => {
      const newState = store.getState();
      expect(newState.usr.selectedUser).toBe(stubUser);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });


//   it(`'updateLoginStatus' should update todo correctly`, (done) => {
//     const spy = jest.spyOn(axios, 'put')
//       .mockImplementation(url => {
//         return new Promise((resolve, reject) => {
//           const result = {
//             status: 200,
//             data: null,
//           };
//           resolve(result);
//         });
//       })

//     store.dispatch(actionCreators.updateLoginStatus()).then(() => {
//       expect(spy).toHaveBeenCalledTimes(1);
//       done();
//     });
//   });
});
