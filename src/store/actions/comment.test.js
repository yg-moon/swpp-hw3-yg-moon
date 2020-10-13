import axios from 'axios';
// import * as router from 'connected-react-router';

import * as actionCreators from './comment';
import store from '../store';

const stubComment = {
    id: 1,
    author_id: 1,
    article_id: 1,
    content: "TEST_COMMENT_CONTENT1",
};

describe('ActionCreators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it(`'getCommentList' should fetchcorrectly`, (done) => {
    const stubCommentList = [stubComment];

    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubCommentList
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.getCommentList()).then(() => {
      const newState = store.getState();
      expect(newState.cmm.comments).toBe(stubCommentList);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'getComment' should fetchcorrectly`, (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubComment
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.getComment()).then(() => {
      const newState = store.getState();
      expect(newState.cmm.selectedComment).toEqual(stubComment);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

//   it(`'createComment' should post correctly`, (done) => {
//     const spy = jest.spyOn(axios, 'post')
//       .mockImplementation((url, td) => {
//         return new Promise((resolve, reject) => {
//           const result = {
//             status: 200,
//             data: stubComment
//           };
//           resolve(result);
//         });
//       })

//     store.dispatch(actionCreators.createComment()).then(() => {
//       expect(spy).toHaveBeenCalledTimes(1);
//       done();
//     });
//   });

//   it(`'deleteComment' should delete correctly`, (done) => {
//     const spy = jest.spyOn(axios, 'delete')
//       .mockImplementation(url => {
//         return new Promise((resolve, reject) => {
//           const result = {
//             status: 200,
//             data: null,
//           };
//           resolve(result);
//         });
//       })

//     store.dispatch(actionCreators.deleteComment()).then(() => {
//       expect(spy).toHaveBeenCalledTimes(1);
//       done();
//     });
//   });

//   it(`'editComment' should edit correctly`, (done) => {
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

//     store.dispatch(actionCreators.editComment()).then(() => {
//       expect(spy).toHaveBeenCalledTimes(1);
//       done();
//     });
//   });
});
