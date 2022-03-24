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
            <div className="card-body">
              HALAMAN DASHBOARD
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
                    foods.map((food, index) =>
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td><img src={food.image} alt="" width="25"/> {food.name}</td>
                        <td>{food.price}</td>
                        <td>{food.category}</td>
                        <td>
                          <button className="btn btn-sm btn-warning">Edit</button>
                          <button className="btn btn-sm btn-danger">Delete</button>
                        </td>
                      </tr>
                    )
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