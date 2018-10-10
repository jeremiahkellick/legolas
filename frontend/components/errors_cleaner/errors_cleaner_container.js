import { connect } from 'react-redux';
import { clearErrors } from '../../actions/error';
import ErrorsCleaner from './errors_cleaner';

export default connect(null, { clearErrors })(ErrorsCleaner);
