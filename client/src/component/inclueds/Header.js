import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'

import { authActions } from '../../redux/store';

const Header = () => {
    // useNavigate to redirect to other pages
    const navigate = useNavigate();

    // useDispatch
    const dispatch = useDispatch();


    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const handleLogout = async (req, res) => {
        dispatch(authActions.logout());
        const { data } = await axios.post("/api/v1/user/logout");
        if (data.success) {
            navigate('/login')
        }
    }

    // global state
    let inLogin = useSelector(state => state.inLogin);
    inLogin = inLogin || cookies.token;

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand text-light" to="">React</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active text-light" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/contact">Contact</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle text-light" to="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="">Action</Link></li>
                                    <li><Link className="dropdown-item" to="">Another action</Link></li>
                                    <li><Link className="dropdown-item" to="">Something else here</Link></li>
                                </ul>
                            </li>
                        </ul>
                        {inLogin && (
                            <button className='btn btn-info mx-2' onClick={handleLogout}>Logout</button>
                        )}
                        {!inLogin && (
                            <>
                                <Link to="/login"> <button className='btn btn-info mx-2'>Login</button></Link>
                                <Link to="/signup"><button className='btn btn-info mx-2'>Signup</button></Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
