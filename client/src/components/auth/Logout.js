import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'reactstrap';
import { logout } from '../../actions/authActions';
import { connect } from 'react-redux';

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  }

  render() {
    return (
      <Fragment>
          <NavLink onClick={this.props.logout} href="#">
            Logout
          </NavLink>
      </Fragment>
    )
  }
}

export default connect(null, { logout })(Logout)
