import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Route, Routes} from 'react-router-dom'

import Header from './components/layouts/Header';
import PageList from './components/pages/PageList';
import RoleList from './components/roles/RoleList';
import Users from './components/user/Users';
import UserRoles from './components/user/UserRoles';
import Page1 from './components/access/page1';
import Page2 from './components/access/page2';
import Page3 from './components/access/page3';

function App() {
  return (
    <div className="">
      <ToastContainer/>
      <Header />
      <div className='container'>
      <h4>Demo User Roles-Claims</h4>
      <h5>Current User: {JSON.parse(localStorage.getItem('user'))}</h5>

        <Routes>
            <Route path='/' element={<Users />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/roles' element={<UserRoles />} />
            <Route path='/roles' element={<RoleList />} />
            <Route path='/pages' element={<PageList />} />
            <Route path='/page1' element={<Page1 />} />
            <Route path='/page2' element={<Page2 />} />
            <Route path='/page3' element={<Page3 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
