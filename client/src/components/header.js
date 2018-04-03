import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../actions/auth';

class Header extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout( () => {
      this.props.history.push('/');
    });
  }

  renderLogin() {
    let result;
    switch (this.props.user) {
      case null:
        result = '';
        break;
      case false:
        result = (
          <a
            href="/auth" 
            className="btn btn-info justify-content-end"
          >
            Login in with Spotify
          </a>
        );
        break;
      default:
        result = (
          <span>    
            Logged in as: {this.props.user.email}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a href="#" className="btn btn-info" onClick={this.logout}>Logout</a>
          </span>
        );
    }
    return result;
  }

  render() {
    const login = this.renderLogin();

    let links = '';
    if (this.props.user) {
      links = (
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/albums">Albums</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/ratings">Ratings</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/rating/new">New Rating</a>
          </li>
        </ul>
      );
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Spotify Ratings</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {links}
          <span className="nav-link">
            {login}
          </span>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default withRouter(connect(
  mapStateToProps, 
  { logout },
)(Header));
