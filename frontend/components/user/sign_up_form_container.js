import { connect } from 'react-redux';
import UserForm from './form';
import { createUser } from '../../actions/user';

const mapStateToProps = state => ({
  user: {
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  },
  submitText: 'Sign Up',
  includeName: true,
  placeholder: true,
  errors: state.errors
});

export default connect(mapStateToProps, { submitAction: createUser })(UserForm);
