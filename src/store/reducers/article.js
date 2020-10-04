import * as actionTypes from '../actions/actionTypes';

const initialState = {
    articles: [

    ],
    selectedArticle: {author_id : -1}
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.GET_ARTICLE_LIST:
          return { ...state, articles: action.articles };
        case actionTypes.CREATE_ARTICLE:
            const newArticle = {
            id: action.id,
            author_id: action.author_id,
            title: action.title,
            content: action.content,
          };
          return { ...state, articles: state.articles.concat(newArticle) };
        case actionTypes.GET_ARTICLE:
          let targetArticle;
          const tempFunc = state.articles.map((atc) => {
            if (atc.id === action.targetID) {
              targetArticle = {id: atc.id, author_id: atc.author_id, title: atc.title, content: atc.content};
            }
          });
          return { ...state, selectedArticle: targetArticle};
        case actionTypes.EDIT_ARTICLE:
          const modified = state.articles.map((atc) => {
                if (atc.id === action.article.id) {
                  return { ...atc, title:action.article.title, content: action.article.content };
                } else {
                  return { ...atc };
                }
          });
          return { ...state, articles: modified };
        case actionTypes.DELETE_ARTICLE:
          const deletedArticles = state.articles.filter((atc) => {
            return atc.id !== action.targetID;
          });
          return { ...state, articles: deletedArticles };
        default:
            break;
    }
  return state;
};

export default reducer;