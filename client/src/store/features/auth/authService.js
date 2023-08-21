import axios from 'axios'
import { toast } from 'react-toastify'


const API_URL = "http://localhost:3001/api/auths/"
//const user = JSON.parse(localStorage.getItem('user'))

// Register user
const registerServ = async (userData) => {
  try {
    const response = await axios.post(API_URL + "register", userData)
  // if (response.data) {
    
  //   localStorage.setItem('user', JSON.stringify(response.data))
  // }
  return response.data
  
  } catch (error) {
    console.log(error)
  }
}
const verifyEmailServ = async (userData) => {
  try {
    const response = await axios.post(API_URL + "verify-email", userData)
  if (response.data) {
    
  //  localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
  
  } catch (error) {
    console.log(error)
  }
}
const forgotPasswordServ = async (userData) => {
  try {
    const response = await axios.post(API_URL + "forgot-password", userData)
console.log(response.data)
  return response.data
  
  } catch (error) {
    console.log(error)
  }
}
const resetPasswordServ = async (userData) => {
  try {
    const response = await axios.post(API_URL + "reset-password", userData)

  return response.data
  
  } catch (error) {
    console.log(error)
  }
}


const doctorRegisterServ = async (userData,token) => {
  
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    console.log(userData)
    const response = await axios.post(API_URL + "apply-doctor", userData , config)
    
    return response.data
  } catch (error) {
    console.log("Doctor Register Error:", error);
  }
}
// Login user
const loginServ = async (userData) => {
  try {
    const response = await axios.post(API_URL + "login", userData)
    if(response.data.verifyError){
      return toast.info("Mail adresinize gelen doğrulama işlemi için linke tıklayınız ve tekrar giriş yapınız.")
    }
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// Logout user
const logoutServ = () => {
  localStorage.removeItem('user')
}

const authService = {
  registerServ,
  logoutServ,
  loginServ,
  doctorRegisterServ,
  verifyEmailServ,
  forgotPasswordServ,
  resetPasswordServ
}

export default authService
