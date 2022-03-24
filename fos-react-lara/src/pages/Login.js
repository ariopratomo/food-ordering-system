import React, { useState, useEffect } from 'react';

//  import naviagte from react-router-dom
import { useNavigate } from 'react-router-dom';
// import axios
import axios from 'axios';

function Login()
{

  // create state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState('');

  // set navigate
  const navigate = useNavigate();
  // use effect
  useEffect(() =>{
    if (localStorage.getItem('token'))
    {
      navigate('/dashboard');
    }
  }, []);
  // function loginHandler asynchronously with e parameter
  const loginHandler = async (e) =>
  {
    e.preventDefault();
    // formdata
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    // axios post request
    await axios.post('http://127.0.0.1:8000/api/login', formData)
      .then(response =>
      {
        if (response.data.success)
        {
          // set token
          localStorage.setItem('token', response.data.token);
          // set user
          localStorage.setItem('user', JSON.stringify(response.data.user));
          // navigate to dashboard
          navigate('/dashboard');
        }
      }).catch(error =>
      {

      })

  }


  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              HALAMAN LOGIN

              <hr />
              {
                validation.message && (
                  <div className="alert alert-danger">
                    {validation.message}
                  </div>
                )
              }
              <form onSubmit={loginHandler}>
                <div className="mb-3">
                  <label className="form-label">ALAMAT EMAIL</label>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan Alamat Email" />
                </div>
                {
                  validation.email && (
                    <div className="alert alert-danger">
                      {validation.email[0]}
                    </div>
                  )
                }
                <div className="mb-3">
                  <label className="form-label">PASSWORD</label>
                  <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password" />
                </div>
                {
                  validation.password && (
                    <div className="alert alert-danger">
                      {validation.password[0]}
                    </div>
                  )
                }
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">LOGIN</button>
                </div>
              </form>
            </div></div>
        </div>
      </div>
    </div>
  )

}

export default Login;