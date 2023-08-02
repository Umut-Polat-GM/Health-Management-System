import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DoctorRegister from './components/authentication/DoctorRegister';

function App() {
  return (
    <><Router>
      <div className='container'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
          <Route path='/apply-doctor' element={<DoctorRegister />} />
        </Routes>
      </div>
    </Router>
      <ToastContainer /></>
  );
}

export default App;


