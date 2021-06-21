import {API} from "../../backend";
// API means: http://localhost:8000/api/

//ALL the routes
//Signup route
export const signup = user => {
  return fetch(`${API}/signup`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  .then(response => {
    return response.json();
  })
  .catch(err => {
    console.log(err);
  })
};

//Signin route
export const signin = user => {
  return fetch(`${API}/signin`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  .then(response => {
    return response.json();
  })
  .catch(err => {
    console.log(err);
  })
};

//set token in signin
export const authenticate = (data, next) => {
  if(typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data))
    next();
  }
};

//Signout route
export const signout = next => {
  if(typeof window !== "undefined") {
    localStorage.removeItem("jwt")
    next();

    return fetch(`${API}/signout`, {
      method: "GET"
    })
    .then(response => console.log("Signout Success"))
    .catch(err => console.log(err));

  }
};

//check user signin or signout
export const isAuthenticated = () => {
  if(typeof window == "undefined") {
      return false; //user not authenticated
  }

  if(localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt")); //user signin
  } else {
    return false;
  }
};