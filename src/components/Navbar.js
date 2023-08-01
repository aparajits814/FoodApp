import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from './Go-Food.png'
function Navbar() {
    const Navigate=useNavigate();
    const GotoCart=()=>{
        Navigate('/cart');
    }
    const LogoutFunc=()=>{
        localStorage.removeItem("AuthToken");
        Navigate("/login");
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><img src={logo} alt="logo" id='navimage' /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse me-auto" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        </li>
                        {localStorage.getItem("AuthToken") && <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/myorders">My Orders</Link>
                        </li>}
                    </ul>
                </div>
                <div className="d-flex">
                    {(!localStorage.getItem('AuthToken')) ?
                        <>
                            <Link className="btn btn-danger mx-2" to="/login">Login</Link>
                            <Link className="btn btn-danger mx-2" to="/signup">SignUp</Link>
                        </>
                        :
                        <>
                        <div className="btn btn-danger mx-2" onClick={GotoCart}>
                            My-Cart
                        </div>
                        <div className="btn btn-danger mx-2" onClick={LogoutFunc}>
                            Logout
                        </div>
                        </>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
