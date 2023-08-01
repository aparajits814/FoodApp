import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'
import { Spin, message} from 'antd'
function Signup() {
    const [loading,setLoading]=useState(false);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [location,setLocation]=useState("");
    const HandleOnClick=async (e)=>{
        setLoading(true);
        const credential={
            name:name,
            email:email,
            password:password,
            location:location
        }
        e.preventDefault();
        console.log("CLICKED");
        console.log(JSON.stringify(credential));

        const response=await fetch('http://localhost:5000/api/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(credential)
        })
        const r= await response.json();

        if(r.msgType==="warning"){
            message.warning(r.msg);
        }else if(r.msgType==="error"){
            message.error(r.msg);
        }else{
            message.success(r.msg);
        }
        setLoading(false);
    }
    const onCname=(e)=>{
        setName(e.target.value);
    }
    const onCemail=(e)=>{
        setEmail(e.target.value);
    }
    const onCpass=(e)=>{
        setPassword(e.target.value);
    }
    const onCloc=(e)=>{
        setLocation(e.target.value);
    }
    return (
        <>
        <Navbar></Navbar>
        {loading && (<Spin size='large' />)}
            <div className="container signup_container">
                <form onSubmit={HandleOnClick} className='mt-4'>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={name} onChange={onCname}/>
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={email} onChange={onCemail}/>
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={password} onChange={onCpass}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">location</label>
                        <input type="text" className="form-control" name='location' value={location} onChange={onCloc}/>
                    </div>
                    <button type="submit" className="btn btn-danger">Submit</button>
                    <Link to="/login" className="form-text font_color_custom m-2">Already a User?</Link>
                </form>
            </div>
        </>
    )
}

export default Signup
