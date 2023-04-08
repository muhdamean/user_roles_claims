import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Route, Routes} from 'react-router-dom'

import Header from './components/layouts/Header';
import PageList from './components/pages/PageList';
import RoleList from './components/roles/RoleList';
import Users from './components/user/Users';
import UserRoles from './components/user/UserRoles';

function App() {
  return (
    <div className="">
      <ToastContainer/>
      <Header />
      <div className='container'>
      <h4>Demo User Roles-Claims</h4>

        <Routes>
            <Route path='/' element={<Users />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/roles' element={<UserRoles />} />
            <Route path='/roles' element={<RoleList />} />
            <Route path='/pages' element={<PageList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
