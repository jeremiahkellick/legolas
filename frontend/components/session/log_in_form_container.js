import { connect } from 'react-redux';
import { logIn } from '../../actions/session';
import UserForm from '../user/form';

const mapStateToProps = state => ({
  user: {
    email: '',
    password: ''
  },
  submitText: 'Sign In',
  includeName: false,
  errors: state.errors
});

export default connect(mapStateToProps, { submitAction: logIn })(UserForm);
