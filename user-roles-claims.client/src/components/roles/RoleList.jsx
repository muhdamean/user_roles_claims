import { useEffect, useState } from "react"
import agent from "../../api/agent"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { addRole, setRoleList } from "./roleSlice"

export default function RoleList() {
    const [roles, setRoles] = useState([])
    const [formData, setFormData] = useState({id: 0, role: "", status: "" })
    const dispatch = useDispatch();
console.log('roles here....',useSelector(state=>state.roles.roles))
    const getData = async () => {
        await agent.Roles.get().then((res) => {
            if (res.status === 200) {
                setRoles(res.data)
                dispatch(setRoleList(res.data))
            }
        })
    }

    useEffect(() => {
        getData();
    }, [])


    const submitRole = async (e) => {
        e.preventDefault();
        if (formData.role === "" && formData.status === "") {
            toast.warn("role name and status is required!");
        }
        if(formData.id===0){
            await agent.Roles.post(formData).then((res) => {
                if (res.status === 201) {
                    dispatch(addRole(res.data));
                    getData();
                    toast.success("Role saved successfully!");
                } else {
                    toast.error("error saving data, try again.");
                }
                document.getElementById("Close").click();
            })
        }else{
            toast.success("update endpoint here...");
            document.getElementById("Close").click();
        }
    }

    const onEdit = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    return (
        <>
            <div className="row">
                <div className="col-sm-10">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Create Role
                    </button>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Role Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((x, i) => (
                                <tr key={i}>
                                    <td>{x.id}</td>
                                    <td>{x.role}</td>
                                    <td>{x.status === true ? 'Active' : 'Disable'}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>{
                                            setFormData({
                                                id:x.id,
                                                role: x.role,
                                                status: x.status
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
                                    <label htmlFor="pageName" className="form-label">
                                        Role name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="role"
                                        onChange={onEdit}
                                        value={formData.role}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Description" className="form-label">
                                        Role Status
                                    </label>
                                    <select onChange={onEdit} value={formData.status} className="form-control"
                                        id="status" >
                                        <option value={''}>Select role status</option>
                                        <option value={'true'}>Active</option>
                                        <option value={'false'}>Disable</option>
                                    </select>
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