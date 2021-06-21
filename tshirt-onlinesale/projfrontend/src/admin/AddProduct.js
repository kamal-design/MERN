import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';
import { createProduct, getCategories } from './helper/adminapicall';
import {isAuthenticated} from '../auth/helper/index';

const AddProduct = ()  =>{
  const {user, token} = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    FormData: ""
  });

  const {name, description, price, stock, categories, category, loading, error, createdProduct, getaRedirect, formData} = values;

  const preload = () => {
    getCategories().then(data => {
      //console.log(data);
      if(data.error){
        setValues({...values, error: data.error});
      } else {
        setValues({...values, categories: data, formData: new FormData() });
        //console.log(categories);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData)
    .then( data => {
      if(data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, name: "", description: "", price: "", photo: "", stock: "", loading: false, createdProduct: data.name})
      }
    });
  };

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value
    formData.set(name, value);
    setValues({ ...values, [name]: value});
  }

  const successMessage = () =>  (
    <div className="alert alert-success mt-3" role="alert" style={{display: createdProduct ? " " : "none"}}>
        <h4> {createdProduct} Created Successfully</h4>
    </div>
  );

  const warningMessage = () => {
    if(error) {
      return(
        <div className="alert alert-danger mt-3" role="alert" style={{display: error ? " " : "none"}}>
            <h4> {error} Failed Create Product</h4>
        </div>
      );
    }   
  }

  const createProductForm = () => (
    <form className="my-3">
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories && categories.map((cate, index) => (
            <option key={index} value={cate._id}>{cate.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>
      
      <button type="submit" onClick={onSubmit} className="btn btn-outline-success">
        Create Product
      </button>
    </form>
  );


  const goBack = () => (
    <div className="text-left">
      <Link to="/admin/dashboard"  className="btn btn-sm btn-dark mb-3"> Admin Home</Link>
    </div>
  );



  return (
    <Base title="Add a Product here!" description="Welcome to product creataion section" className="container bg-white p-4">
      {goBack()} 
      <div className="row border-top">
          <div className="offset-md-2 col-md-8">              
              {successMessage()}
              {createProductForm()}        
          </div>
      </div>
    </Base>
  );
};

export default AddProduct;