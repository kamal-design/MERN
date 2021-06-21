import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/helper';



//active navbar
const cuttentTab = (history, path) => {
  if(history.location.pathname === path) {
    return {color: "#2ecc72"}
  } else {
    return {color: "#d1d1d1"}
  }
}

const Menu = ({history}) => (
  <div>
    <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link style={cuttentTab(history, "/")} className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link style={cuttentTab(history, "/cart")}  className="nav-link" to="/cart">Cart</Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && ( 
          <li className="nav-item">
            <Link style={cuttentTab(history, "/user/dashboard")} className="nav-link" to="/user/dashboard">User Dashboard</Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && ( 
          <li className="nav-item">
              <Link style={cuttentTab(history, "/admin/dashboard")} className="nav-link" to="/admin/dashboard">Admin Dashboard</Link>
          </li>
        )}


        {!isAuthenticated() && (
          <Fragment>          
              <li className="nav-item">
                <Link style={cuttentTab(history, "/signup")} className="nav-link" to="/signup">Signup</Link>
              </li>
              <li className="nav-item">
                <Link style={cuttentTab(history, "/signin")} className="nav-link" to="/signin">Signin</Link>
              </li>        
          </Fragment>
        )}
          
        {isAuthenticated() && (
          <li className="nav-item">
            <span class="nav-link text-warning" onClick={ () => {
              signout( () => {
                history.push("/")
              })
            }}>Signout</span>
          </li>
        )}

    </ul>
  </div>
)
export default withRouter(Menu);