import React, { useState, useEffect } from 'react';

// import naviagte from react-router-dom
import { useNavigate } from 'react-router-dom';

// import axios
import axios from 'axios';

function Dashboard()
{

  // create state
  // foods
  const [foods, setFoods] = useState({});

  // set navigate
  const navigate = useNavigate();

  // token
  const token = localStorage.getItem('token');
  // fetch foods
  const fetchFoods = async () =>
  {
    // set axios headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    await axios.get('http://127.0.0.1:8000/api/foods')
      .then(response => {
        setFoods(response.data.foods);
        console.log(response.data);
       })
      .catch(error => { })
  }
  // use effect
  useEffect(() =>
  {
    if (!token)
    {
      navigate('/login');
    }
    // get foods
    fetchFoods();

  }, []);

  // logout function with async await
  const logoutHandler = async () => {
    // set axios headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // logout
    await axios.post('http://127.0.0.1:8000/api/logout').then(response =>{
      // remove token
      localStorage.removeItem('token');
      // remove user
      localStorage.removeItem('user');
      // navigate to login
      navigate('/login');
    })
  }

  // function addFoodHandler asynchronously to navigate to add food page
  const addFoodHandler = async () =>
  {
    // navigate to add food page
    navigate('/add-food');
  }

    

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <nav class="navbar navbar-expand navbar-light bg-light">
          <div class="nav navbar-nav">
              <button onClick={logoutHandler} className="nav-item nav-link active btn btn-md btn-danger">LOGOUT</button>
          </div>
      </nav>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-header">
              <h3 className="mb-0">Foods</h3>
              {/* button addFoodHandler float right */}
              <button onClick={addFoodHandler} className="btn btn-sm btn-primary float-right">Add Food</button>

            </div>
            <div className="card-body">
              {/* table data foods fetchFoods*/}
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nama Makanan</th>
                    <th scope="col">Harga</th>
                    <th scope="col">Kategori</th>
                    <th scope="col">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    // if foods length more than 0 then show data
                    foods.length > 0 ? ( foods.map((food, index) => { 
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{food.name}</td>
                          <td>{food.price}</td>
                          <td>{food.category}</td>
                          <td>
                            <button className="btn btn-sm btn-primary">Edit</button>
                            <button className="btn btn-sm btn-danger">Delete</button>
                          </td>
                        </tr>
                      )
                    }) ) : ( <tr><td colSpan="5" className='text-center'>No Data</td></tr> )  

                  }
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Dashboard;