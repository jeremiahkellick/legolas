import * as APIUtil from '../util/user_api_util';
import { receiveErrors } from './error';
import { receiveCurrentUser } from './session';

export const createUser = user => dispatch => (
  APIUtil.createUser(user).then(
    user => dispatch(receiveCurrentUser(user)),
    res => dispatch(receiveErrors(res.responseJSON))
  )
);
