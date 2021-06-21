import React, {useState} from 'react';
import Base from "../core/Base";
import {Link, Redirect} from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {

  const [values, setValues] = useState({
    email: "smkamal.sm@gmail.com",
    password: "12345",
    error: "",
    loading: false,    
    didRedirect: false
  });

  const {email, password, error, loading, didRedirect} = values;
  const {user} = isAuthenticated();

  const handleChange = email => event => {
    setValues({ ...values, error: false, [email]: event.target.value });
  }; 

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true })
    signin({email, password})
    .then(data => {
      if(data.error){
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () =>{
          setValues({ ...values, didRedirect: true })
        })
      }
    })
    .catch( console.log("signin request failed"))
  };



  const performRedirect = () => {
    //TODO: do a redirect here
    if(didRedirect){
      if(user && user.role === 1 ) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
  }

    if(isAuthenticated()){
      return <Redirect to="/" />;
    }
  };


  const signInForm = () => {
    return (
      <div className="row">
        <div className="offset-sm-3 col-md-6">
            <form>              
              <div className="form-group">
                <label for="Name" className="text-light">Email</label>
                <input onChange={handleChange("email")} value={email} type="email" className="form-control" placeholder="Email Address" />
              </div>
              <div className="form-group">
                <label for="Name" className="text-light">Password</label>
                <input  onChange={handleChange("password")} value={password} type="password" className="form-control" placeholder="Password" />
              </div>
              <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
            </form>
        </div>
      </div>
    )
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-success" role="alert">
          <h2> Loading... </h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return(
      <div className="row">
        <div className="offset-sm-3 col-md-6">
          <div className="alert alert-danger" role="alert" style={{display: error ? "" : "none"}}>
            {error}
          </div>
        </div>
      </div>    
    );
  };

  return (
    <Base title="Sign in Page" description="A page for user to sign In!">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;