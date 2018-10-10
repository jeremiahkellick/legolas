import * as APIUtil from '../util/user_api_util';
import { receiveErrors } from './error';

export const createUser = user => dispatch => (
  APIUtil.createUser(user)
    .then(() => {}, res => dispatch(receiveErrors(res.responseJSON)))
);
