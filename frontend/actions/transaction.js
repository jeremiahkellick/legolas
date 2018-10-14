import * as APIUtil from '../util/transaction_api_util';
import { receiveCurrentUser } from './session';
import { receiveErrors, clearErrors } from './error';

export const createTransaction = transaction => dispatch => (
  APIUtil.createTransaction(transaction).then(
    user => {
      dispatch(receiveCurrentUser(user));
      dispatch(clearErrors());
    },
    res => dispatch(receiveErrors(res.responseJSON))
  )
);
