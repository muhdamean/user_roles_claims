import { useEffect, useState } from "react"
import agent from "../../api/agent"
import { useDispatch } from "react-redux"
import { setPageList } from "./pageSlice"
import { toast } from "react-toastify"

export default function PageList() {
    const [pages, setPages] = useState([])
    const [formData, setFormData] = useState({ Name: "", Description: "" })
    const dispatch = useDispatch();

    const getPages = async (e) => {
        await agent.Pages.get().then((res) => {
            if (res.status === 200) {
                setPages(res.data)
                dispatch(setPageList(res.data))
            }
        })
    }
  
    // useEffect(() => {
    //     getPages();

    // }, [])


    const submitPage = async (e) => {
        e.preventDefault();
        console.log('oooops', formData)
        if (formData.Name === "" && formData.Description === "") {
            toast.warn("Page name and description is required!");
        }
        document.getElementById("Close").click();
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
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Create Page
                    </button>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colSpan={2}>Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
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