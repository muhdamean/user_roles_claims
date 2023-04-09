import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../user/userSlice";
import { toast } from "react-toastify";

export default function Header() {
    const dispatch=useDispatch();
    const [data, setData]=useState("");

    const onEdit=(e)=>{
        e.preventDefault();
        setData({
            ...data,
            [e.target.id]: e.target.value
        })
    }
    const submitLogin=(e)=>{
        e.preventDefault();
        if(data===""){
            return toast.warn("invalid details");
        }
        dispatch(loginUser(data));
        document.getElementById("Close").click();
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        RolesDemo
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/users">
                                    Users
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/users/roles">
                                    Users Roles
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/roles">
                                    Roles
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/pages">
                                    Pages
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Demo Access
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/page1">Page1</a></li>
                                    <li><a className="dropdown-item" href="/page2">Page2</a></li>
                                    <li><a className="dropdown-item" href="/page3">Page3</a></li>
                                </ul>
                                </li>

                        </ul>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">
                                    Login
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div
                className="modal fade"
                id="loginModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <form onSubmit={submitLogin}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">
                                    Login
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    id="Close"
                                />
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="pageName" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        onChange={onEdit}
                                    />
                                </div>
                               
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
        
    )
}