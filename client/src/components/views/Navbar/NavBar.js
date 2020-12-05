import React from "react";
import Axios from "axios";
import { USER_SERVER } from "../../Config";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBar(props) {
  const user = useSelector((state) => state.user);
  const { userData } = user;

  const logoutHandler = () => {
    Axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            Ps Store
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link to="/" className="nav-link" href="#">
                  Home
                </Link>
              </li>

              <li className="nav-item active">
                <Link to="/login" className="nav-link" href="#">
                  Login
                </Link>
              </li>

              <li className="nav-item active">
                <Link to="/register" className="nav-link" href="#">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            Ps Store
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link to="/" className="nav-link" href="#">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/user/cart">
                  <i className="fas fa-shopping-cart fa-lg"></i>
                  <span className="badge badge-info ml-1">
                    {userData && userData.cart.length}
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/history" className="nav-link">
                  History
                </Link>
              </li>

              <li className="nav-item active">
                <a className="nav-link" href="/login" onClick={logoutHandler}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
