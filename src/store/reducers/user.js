import * as actionTypes from '../actions/actionTypes';

const initialState = {
    users: [

    ],
    selectedUser: {logged_in: true},
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.GET_USER_LIST:
            return { ...state, users: action.users };
        case actionTypes.GET_USER:
            return { ...state, selectedUser: action.target };
        case actionTypes.UPDATE_LOGIN_STATUS:
            const modified = state.users.map((usr) => {
                if (usr.id === action.targetID) {
                  return { ...usr, logged_in: !usr.logged_in };
                } else {
                  return { ...usr };
                }
              });
            return { ...state, users: modified };
        default:
            break;
    }
  return state;
};

export default reducer;