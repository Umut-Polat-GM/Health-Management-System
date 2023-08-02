import axios from 'axios'

const API_URL = "http://localhost:3001/api/auths/"
const user = localStorage.getItem('user')

// Register user
const registerServ = async (userData) => {
  const response = await axios.post(API_URL + "register", userData)
  if (response.data) {
    localStorage.setItem('user', response.data)
  }
  return response.data
}

const doctorRegisterServ = async (userData,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL + "doctorApplyRegister",   { ...userData, userId: user._id }, config)
  
  return response.data
}
// Login user
const loginServ = async (userData) => {
  try {
    const response = await axios.post(API_URL + "login", userData)

    if (response.data) {
      localStorage.setItem('user', response.data)
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
  doctorRegisterServ
}

export default authService
