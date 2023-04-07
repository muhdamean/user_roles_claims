import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/layouts/Header';
import PageList from './components/pages/PageList';

function App() {
  return (
    <div className="">
      <ToastContainer/>
      <Header />
      <div className='container'>
      <h4>Demo User Roles-Claims</h4>
      <PageList/>
      </div>
    </div>
  );
}

export default App;
