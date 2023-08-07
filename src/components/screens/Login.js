import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'
import { message,Spin} from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
function Login() {
  const [loading,setLoading]=useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const Navigate=useNavigate();
  const onCemail = (e) => {
    setEmail(e.target.value);
  }
  const onCpass = (e) => {
    setPassword(e.target.value);
  }
  const HandleOnClick = async (e) => {
    setLoading(true);
    const credential = {
      email: email,
      password: password,
    }
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credential)
    })
    const r=await response.json();
    if(r.successPassword===false){
      message.warning(r.msg);
    }else if(r.successUser===false){
      message.warning(r.msg);
    }else{
      message.success("Logged in Successfully");
      localStorage.setItem('AuthToken',r.authToken);
      Navigate("/");
    }
    setLoading(false);
  }
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <>
      <Navbar></Navbar>
      {loading && (<Spin indicator={antIcon} />)}
      <div className="container signup_container">
        <form onSubmit={HandleOnClick} className='mt-4'>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={email} onChange={onCemail} />

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={password} onChange={onCpass} />
          </div>
          <button type="submit" className="btn btn-danger">Submit</button>
          <Link to="/signup" className="form-text font_color_custom m-2">Not a User? Register Now!</Link>
        </form>
      </div>
    </>
  )
}

export default Login
