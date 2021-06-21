import React, {useState} from 'react';
import Base from "../core/Base";
import {Link} from "react-router-dom";
import { signup } from '../auth/helper';

const Signup = () => {

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  // data destructure 
  const {name, email, password, error, success } = values;

  // higher order function
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  }; 

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })   
    .then( data => {
      //console.log(data); 
      if (data.error){
        setValues({...values,  error: data.error, success: false});
      } else {
        setValues({...values, name: "", email: "", password: "", error: "", success: true});
      } 
    })
    .catch(console.log("Error in SignUp"));
  } 

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="offset-sm-3 col-md-6">
            <form>
              <div className="form-group">
                <label for="Name" className="text-light">Name</label>
                <input onChange={handleChange("name")} type="text" value={name} className="form-control" placeholder="Full Name" />
              </div>
              <div className="form-group">
                <label for="Name" className="text-light">Email</label>
                <input onChange={handleChange("email")} type="email" value={email}  className="form-control" placeholder="Email Address" />
              </div>
              <div className="form-group">
                <label for="Name" className="text-light">Password</label>
                <input  onChange={handleChange("password")}  type="password" value={password}  className="form-control" placeholder="Password" />
              </div>
              <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
            </form>
        </div>
      </div>
    )
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="offset-sm-3 col-md-6">
            <div className="alert alert-success" role="alert" style={{display: success ? "" : "none"}}>
              New account was created Successfully. Please <Link to="/signin" className="alert-link">Login Here</Link>
            </div>
        </div>
      </div>
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
    <Base title="Sign up Page" description="A page for user to sign up!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;