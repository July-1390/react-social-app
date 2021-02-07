import { v4 as uuid } from "uuid";
import { actions } from "./actionsNames";
import * as fromUsers from "./reducer";

export const recieveAuth = () => ({
  type: actions.RECIEVE_AUTH
});

export const signin = id => ({
  type: actions.SIGNIN,
  payload: {
    id
  }
});

export const signup = username => ({
  type: actions.SIGNUP,
  payload: {
    id: uuid(),
    username
  }
});

export const login = username => (dispatch, getState) => {
  const { users } = getState();

  dispatch({ type: actions.LOGIN, username });

  const userId = fromUsers.getUserIdByUsername(users, username);

  if (userId) {
    return dispatch(signin(userId));
  }

  return dispatch(signup(username));
};

export const logout = () => ({
  type: actions.LOGOUT
});
