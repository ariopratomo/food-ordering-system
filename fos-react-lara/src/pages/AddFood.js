import React,{useState,useEffect} from 'react';

// import hook useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const AddFood = () =>
{

  // create state
  const [name, setName] = useState('');
  // category state
  const [category, setCategory] = useState('');
  // price state
  const [price, setPrice] = useState('');
  // description state
  const [description, setDescription] = useState('');
  // image state
  const [image, setImage] = useState('');
  // category state with select options 
  const [categories, setCategories] = useState([]);
  // is_ready state
  const [is_ready, setIs_ready] = useState(false);
  // set validate
  const [validation, setValidation] = useState('');
  // set navigate
  const navigate = useNavigate();
  // token
  const token = localStorage.getItem('token');

  
  //  funtion createFoodHandler asynchronously with e parameter
  const createFoodHandler = async (e) =>
  {
    e.preventDefault();
    // formdata
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('is_ready', is_ready);
     // set axios headers
     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // axios post request
    await axios.post('http://127.0.0.1:8000/api/foods', formData).then(response =>
    {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }

  // use effect
  useEffect(() =>{
    // check if token
    if (!token)
    {
      navigate('/login');
    }
  }, []);


  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-header">
              <h4 className="fw-bold">Add Food</h4>
            </div>
            <div className="card-body">
              {/* form tambah makanan  with upload file*/}
              <form >
                <div className="form-group">
                  <label className="form-label">Food Name</label>
                  <input type="text" onChange={(e)=>{setName(e.target.value)}} name="name" value={name} className="form-control" placeholder="Food Name" />
                </div>
                {/* description */}
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" onChange={(e)=>{setDescription(e.target.value)}} name="description" rows="3" placeholder="Description">{description}</textarea>
                </div>
                {/* image */}
                <div className="form-group">
                  <label className="form-label">Image</label>
                  <input type="text" className="form-control" onChange={(e)=>{setImage(e.target.value)}} value={image} name="image" placeholder="Image" />
                </div>
                {/* price */}
                <div className="form-group">
                  <label className="form-label">Price</label>
                  <input type="number" className="form-control" onChange={(e)=>{setPrice(e.target.value)}} value={price} name="price" placeholder="Price" />
                </div>
                {/* category with */}
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-control" name="category">
                    <option value="Food" >Food</option>
                    <option value="Drink">Drink</option>
                  </select>
                </div>
                {/* is_ready */}
                <div className="form-group mb-3">
                  <label className="form-label">Is Ready</label>
                  <select className="form-control" name="is_ready">
                    {/* if selected */}
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>

                {/* submit */}

                <button type="submit" className="btn btn-primary">Submit</button>

                {/* cancel */}

                <button type="submit" className="btn btn-danger">Cancel</button>

              </form>
              </div>
          </div>
        </div>
      </div>

    </div>

  );
};

export default AddFood;