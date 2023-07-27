import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <><Router>
      <div className='container'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </Router>
      <ToastContainer /></>
  );
}

export default App;


