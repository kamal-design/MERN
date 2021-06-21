import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getProducts } from './helper/adminapicall';


const ManageProducts = () => {

  const [products, setProducts] = useState([]);

  const {user, token} = isAuthenticated();

  const preload = () => {
    getProducts().then(data => {
      if(data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect( () => {
    preload();
  }, []);

  const goBack = () => (
    <div className="text-left">
      <Link to="/admin/dashboard"  className="btn btn-sm btn-success mb-3"> Admin Home</Link>
    </div>
  );

  return (
    <Base title="Welcome admin" description="Manage products here">
    <h2 className="mb-4">All products:</h2>
    {goBack()}
    <div className="row">
      <div className="col-12">
        <h2 className="text-center text-white my-3">Total 3 products</h2>

        {products.map((products, index) => {
          return (
            <div key={index} className="row text-center mb-2 ">
            <div className="col-4">
              <h3 className="text-white text-left">I write code</h3>
            </div>
            <div className="col-4">
              <Link
                className="btn btn-success"
                to={`/admin/product/update/productId`}
              >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-4">
              <button onClick={() => {}} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
          );
        })}
        
      </div>
    </div>
  </Base>
  )
}

export default ManageProducts;
