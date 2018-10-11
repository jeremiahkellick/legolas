import { connect } from 'react-redux';
import { logIn } from '../../actions/session';
import UserForm from '../user/form';

const mapStateToProps = state => ({
  user: {
    email: '',
    password: ''
  },
  submitText: 'Sign In',
  demoButton: true,
  includeName: false,
  placeholder: false,
  errors: state.errors
});

export default connect(mapStateToProps, { submitAction: logIn })(UserForm);
