import { useSelector } from "react-redux"
import { currentUserRolesByPage } from "../user/userSlice"

export default function Page3() {
    const pagerole = useSelector(state => currentUserRolesByPage(state, window.location.pathname))
    return (
        <>
                <div className="row">
                    <div className="col-sm-4">
                        <label>create access</label><br/>
                        {pagerole[0]?.creates === true &&
                            <button type="button" className="btn btn-primary" >
                                Create User
                            </button>
                        }
                    </div>

                    <div className="col-sm-4">
                        <label>update access</label><br/>
                        {pagerole[0]?.updates === true &&
                            <button type="button" className="btn btn-info" >
                                Update User
                            </button>
                        }
                    </div>

                    <div className="col-sm-4">
                        <label>delete access </label><br/>
                        {pagerole[0]?.deletes === true &&
                            <button type="button" className="btn btn-danger" >
                                Delete User
                            </button>
                        }
                    </div>

                </div>
            </>
            )
}