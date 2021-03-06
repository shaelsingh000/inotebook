
import {
    Link,
    useLocation,
    useNavigate
  } from "react-router-dom";
  
import React from 'react';
    

const Navbar = () => {
    let history = useNavigate();
    const Logout = () =>{
        localStorage.removeItem('token');
        history("/login");
    }
    let location = useLocation();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary bg-gradient">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"? "active":""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${ location.pathname==="/about"? "active":""}`} aria-current="page" to="/about">About</Link>
                        </li>
                    </ul>{!localStorage.getItem('token')?
                    <form className="d-flex"> 
                    <Link className="btn btn-success bg-gradient mx-1" to="/login" role="button">Login</Link>
                    <Link className="btn btn-success bg-gradient mx-1" to="/signup" role="button">Signup</Link>
                    </form>: <button onClick={Logout} className="btn btn-success bg-gradient mx-1">Logout</button>}
                    </div>
                </div>
                </nav>
        </div>
    )
}
export default Navbar
