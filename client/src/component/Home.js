import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
    // useState
    const [userData, setUsers] = useState();
    const [crediantion, setCrediantion] = useState({ "_id": "", "name": "", "email": "", "mobile": "" });
    let i = 0;
    // function to get all users
    const getAllUsers = async () => {
        try {
            let { data } = await axios.get('/api/v1/user/all-users');
            if (data.success) {
                setUsers(data.users);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // userEffect
    useEffect(() => {
        getAllUsers();
    }, [])


    // function to delete user
    const handelDelete = async (id) => {

        // TODO API call
        try {
            const { data } = await axios.delete('/api/v1/user/deleteUser/' + id);
            getAllUsers();

        } catch (error) {
            console.error(error.message);
        }

    }

    // On typing note 
    const onChange = (e) => {
        setCrediantion({ ...crediantion, [e.target.name]: e.target.value })
    }

    const handelEdit = async (tempData) => {
        setCrediantion(tempData);
        document.getElementById("modalBtn").click();
        console.log(tempData);
    }
    const handelUpdate = async (e) => {
        e.preventDefault();
        let name = crediantion.name;
        let mobile = crediantion.mobile;
        let email = crediantion.email;
        let id = crediantion._id;
        let role = "user";
        try {

            const { data } = await axios.put('/api/v1/user/updateUser/' + id, {
                name: name,
                mobile: mobile,
                email: email,
                role: role
            });

            if (data.success) {
                getAllUsers();
                document.getElementById("btnClose").click();

            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <h1 className='text-center'>User List Data </h1>
            <div className="container">
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">S.N</th>
                            <th scope="col">Name</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Email</th>
                            <th scope="col text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData?.map((e) => (
                            <tr key={e._id} >
                                <th>{i = i + 1}</th>
                                <td>{e.name}</td>
                                <td>{e.mobile}</td>
                                <td>{e.email}</td>
                                <td>
                                    <button className='btn btn-info mx-2' onClick={() => { handelEdit(e) }}>Edit</button>
                                    <button className='btn btn-info mx-2' onClick={() => { handelDelete(e._id) }}>Del</button>
                                </td>
                            </tr>
                        ))
                        }

                    </tbody>
                </table>
                <button type="button" className="btn btn-primary d-none" id="modalBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Launch static backdrop modal
                </button>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                                <button type="button" className="btn-close" id="btnClose" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form>
                                <div className="modal-body">
                                    <div className="containerWidth">
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
                                            <input type="hidden" name='id' value={crediantion._id} id="id" />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={handelUpdate}>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home

