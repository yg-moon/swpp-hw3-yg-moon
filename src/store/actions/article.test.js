import axios from 'axios';
import * as actionCreators from './article';
import store from '../store';

const stubArticle = {
    id: 1,
    author_id: 1,
    title: "TEST_ARTICLE_TITLE_1",
    content: "TEST_CONTENT_1",
};

describe('ActionCreators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })
  
  it(`'getArticleList' should fetch articleList correctly`, (done) => {
    const stubArticleList = [stubArticle];

    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubArticleList
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.getArticleList()).then(() => {
      const newState = store.getState();
      expect(newState.atc.articles).toBe(stubArticleList);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'getArticle' should fetch article correctly`, (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubArticle
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.getArticle()).then(() => {
      const newState = store.getState();
      expect(newState.atc.selectedArticle).toEqual(stubArticle);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'createArticle' should create correctly`, (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, td) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubArticle
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.createArticle(stubArticle)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'deleteArticle' should delete correctly`, (done) => {
    const spy = jest.spyOn(axios, 'delete')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubArticle,
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.deleteArticle(stubArticle)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'editArticle' should edit correctly`, (done) => {
    const spy = jest.spyOn(axios, 'put')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubArticle,
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.editArticle(stubArticle)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
