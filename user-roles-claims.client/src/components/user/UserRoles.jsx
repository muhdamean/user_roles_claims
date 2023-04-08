import { useEffect, useState } from "react"
import agent from "../../api/agent"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { selectAllUsers } from "./userSlice"
import { addRole, setRolesClaims } from "../roles/roleSlice"

export default function UserRoles() {
    const dispatch = useDispatch();
    const [roleList, setRoleList] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const [formData, setFormData] = useState({ id: 0, email: "", role: "", page: "", create: "", update: "", delete: "" })
    const roles= useSelector((state) => state.roles.roles);
    const users = useSelector(selectAllUsers);
    const pages = useSelector((state) => state.pages.pages);

    const getData = async () => {
        await agent.Roles.getUsersRoles().then((res) => {
            if (res.status === 200) {
                dispatch(setRolesClaims(res.data))
                setRoleList(res.data)
            }
        })
    }

    const getUserRoles = async (email) => {
        await agent.Roles.getUserRolesByEmail(email).then((res) => {
            if (res.status === 200) {
                if (res.data?.length > 0) {
                    let rows = [];
                    res.data.map((x, i) => {
                        return rows.push(
                            x.role
                        );
                    })
                    setUserRoles(rows)
                }
            }else{
                setUserRoles([]);
            }
        })
    }

    useEffect(() => {
        getData();
    }, [])


    const submitRole = async (e) => {
        e.preventDefault();
        if (formData.email === "" || formData.page === "" || formData.role === "") {
            toast.warn("email, role and page are required!");
        }
        if (formData.id === 0) {
            console.log(formData)
            await agent.Roles.postAddUserToRole(formData).then((res) => {
                if (res.status === 201) {
                    dispatch(addRole(res.data));
                     getData();
                    toast.success("User role saved successfully!");
                } else {
                    toast.error("error saving data, try again.");
                }
                document.getElementById("Close").click();
            })
        } else {
            toast.success("update endpoint here...");
            document.getElementById("Close").click();
        }
    }

    const onEdit = async (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
        if (e.target.id === "email") {
            await getUserRoles(e.target.value);
        }
    }

    return (
        <>
            {console.log('list ', roleList)}
            <div className="row">
                <div className="col-sm-10">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Create User
                    </button>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Page</th>
                                <th scope="col">Create</th>
                                <th scope="col">Update</th>
                                <th scope="col">Delete</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {roleList.map((x, i) => (
                                <tr key={i}>
                                    <td>{x.id}</td>
                                    <td>{x.email}</td>
                                    <td>{x.role}</td>
                                    <td>{x.page}</td>
                                    <td>{x.create === true ? 'Yes' : 'No'}</td>
                                    <td>{x.update === true ? 'Yes' : 'No'}</td>
                                    <td>{x.delete === true ? 'Yes' : 'No'}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => {
                                            setFormData({
                                                id: x.id,
                                                email: x.email,
                                                role: x.role,
                                                page: x.page,
                                                create: x.create,
                                                update: x.update,
                                                delete: x.delete
                                            })
                                        }}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <form onSubmit={submitRole}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">
                                    Modal title
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
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <select onChange={onEdit} value={formData.email} className="form-control"
                                        id="email" >
                                        <option value={''}>Select user</option>
                                        {users.map((x, i) => (
                                            <option key={i} value={x.email}>{x.email}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="role" className="form-label">
                                        Roles
                                    </label>
                                    <select onChange={onEdit} value={formData.role} className="form-control"
                                        id="role" >
                                        <option value={''}>Select role</option>
                                        {roles.filter(x => !userRoles.includes(x.role)).map((x, i) => (
                                            <option key={i} value={x.id}>{x.role}</option>
                                        ))}
                                        {console.log(roles)}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="page" className="form-label">
                                        Pages
                                    </label>
                                    <select onChange={onEdit} value={formData.page} className="form-control"
                                        id="page" >
                                        <option value={''}>Select page</option>
                                        {pages.map((x, i) => (
                                            <option key={i} value={x.id}>{x.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <label htmlFor="page" className="form-label">
                                                Create
                                            </label>
                                            <select onChange={onEdit} value={formData.create} className="form-control"
                                                id="create" >
                                                <option value={''}>Select status</option>
                                                <option value={'true'}>Yes</option>
                                                <option value={'false'}>No</option>
                                            </select>
                                        </div>
                                        <div className="col-sm-4">
                                            <label htmlFor="update" className="form-label">
                                                Update
                                            </label>
                                            <select onChange={onEdit} value={formData.update} className="form-control"
                                                id="update" >
                                                <option value={''}>Select status</option>
                                                <option value={'true'}>Yes</option>
                                                <option value={'false'}>No</option>
                                            </select>
                                        </div>
                                        <div className="col-sm-4">
                                            <label htmlFor="delete" className="form-label">
                                                Delete
                                            </label>
                                            <select onChange={onEdit} value={formData.delete} className="form-control"
                                                id="delete" >
                                                <option value={''}>Select status</option>
                                                <option value={'true'}>Yes</option>
                                                <option value={'false'}>No</option>
                                            </select>
                                        </div>
                                    </div>
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
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}