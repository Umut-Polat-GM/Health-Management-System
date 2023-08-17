import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DoctorRegister from './components/authentication/DoctorRegister';
import VerifyPage from './pages/Verify';
import NotFound from "./pages/notFound/NotFound"
import Loading from './pages/loading/Loading';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ResetPassword from './pages/forgotPassword/ResetPassword';
import Deneme from './pages/Deneme';
function App() {
  return (
    <>
 
    <Router>
      <div className='container'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
          <Route path='/apply-doctor' element={<DoctorRegister />} />
          <Route path='/user/verify-email' element={<VerifyPage />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/user/loading/:email' element={<Loading />} />
          <Route path='/user/forgot-password' element={<ForgotPassword />} />
          <Route path='/user/reset-password' element={<ResetPassword />} />
          <Route path='/deneme' element={<Deneme />} />
        </Routes>
      </div>
    </Router>
      <ToastContainer /></>
  );
}

export default App;


