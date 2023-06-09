import { useEffect, useState } from "react"
import agent from "../../api/agent"
import { useDispatch } from "react-redux"
import { addPage, setPageList } from "./pageSlice"
import { toast } from "react-toastify"

export default function PageList() {
    const [pages, setPages] = useState([])
    const [formData, setFormData] = useState({Id: 0, Name: "", Description: "" })
    const dispatch = useDispatch();

    const getPages = async () => {
        await agent.Pages.get().then((res) => {
            if (res.status === 200) {
                setPages(res.data)
                dispatch(setPageList(res.data))
            }
        })
    }

    useEffect(() => {
        getPages();
    }, [])


    const submitPage = async (e) => {
        e.preventDefault();
        if (formData.Name === "" && formData.Description === "") {
            toast.warn("Page name and description is required!");
        }
        if(formData.Id===0){
            await agent.Pages.post(formData).then((res) => {
                if (res.status === 201) {
                    dispatch(addPage(res.data));
                    getPages();
                    toast.success("Page saved successfully!");
                } else {
                    toast.error("error saving page, try again.");
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
                        Create Page
                    </button>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Page Name</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pages.map((x, i) => (
                                <tr key={i}>
                                    <td>{x.id}</td>
                                    <td>{x.name}</td>
                                    <td>{x.description}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>{
                                            setFormData({
                                                Id:x.id,
                                                Name: x.name,
                                                Description: x.description
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
                    <form onSubmit={submitPage}>
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
                                        Page name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Name"
                                        onChange={onEdit}
                                        value={formData.Name}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Description" className="form-label">
                                        Page description
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Description"
                                        onChange={onEdit}
                                        value={formData.Description}
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