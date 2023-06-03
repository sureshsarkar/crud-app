import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';

const Signup = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [crediantion, setCrediantion] = useState({name:"", mobile: "",email:"", password: ""});

    const handelSignup = async (e) => {
        e.preventDefault();
        let name = crediantion.name;
        let mobile = crediantion.mobile;
        let email = crediantion.email;
        let password = crediantion.password;
        let role = "user";

        try {
              const { data } = await axios.post('/api/v1/user/registerUser', {
                name: name,
                mobile: mobile,
                email: email,
                password: password,
                role: role
            })
            if (data.success) {
            dispatch(authActions.login());
            navigate('/');
            }
        } catch (error) {
            if (error.response.status === 400) {
                alert("Invalid Crediantions")
            }
        }
    }
    // On typing note 
    const onChange = (e) => {
        setCrediantion({ ...crediantion, [e.target.name]: e.target.value })
    }

    return (
        <>
            <h1 className='text-center'>Login Now</h1>
            <div className="container">
                <div className="containerWidth">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Name*</label>
                            <input type="text" className="form-control" minLength={10} maxLength={10} onChange={onChange} value={crediantion.name} required name="name" id="name" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mobile*</label>
                            <input type="text" className="form-control" minLength={10} maxLength={10} onChange={onChange} value={crediantion.mobile} required name="mobile" id="mobile" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email*</label>
                            <input type="text" className="form-control" minLength={10} onChange={onChange} value={crediantion.email} required name="email" id="email" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password*</label>
                            <input type="password" className="form-control" minLength={6} onChange={onChange} value={crediantion.password} required id="password" name="password" />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={handelSignup}>Signup</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup

