import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const connectComponent = (state, actions, component) => {
  return withRouter(connect(state, actions)(component));
};

export default connectComponent;
