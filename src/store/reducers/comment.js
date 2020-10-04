import * as actionTypes from '../actions/actionTypes';

const initialState = {
  comments: [

  ],
  selectedComment: {id : -1}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_COMMENT_LIST:
      return { ...state, comments: action.comments };
    case actionTypes.GET_COMMENT:
      let targetComment;
          const tempFunc = state.comments.map((cm) => {
            if (cm.id === action.targetID) {
              targetComment = {id: cm.id, author_id: cm.author_id, article_id: cm.article_id, content: cm.content};
            }
          });
          return { ...state, selectedComment: targetComment};
    case actionTypes.CREATE_COMMENT:
      const newComment = {
        id: action.id,
        author_id: action.author_id,
        article_id: action.article_id,
        content: action.content,
      };
      return { ...state, comments: state.comments.concat(newComment) };
    case actionTypes.EDIT_COMMENT:
      const modified = state.comments.map((cm) => {
        if (cm.id === action.comment.id) {
          return { ...cm, content: action.comment.content };
        } else {
          return { ...cm };
        }
      });
      return { ...state, comments: modified };
    case actionTypes.DELETE_COMMENT:
      const deletedComments = state.comments.filter((cm) => {
        return cm.id !== action.targetID;
      });
      return { ...state, comments: deletedComments };
    default:
      break;
  }
  return state;
};

export default reducer;