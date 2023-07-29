import axios from 'axios'

const API_URL = "http://localhost:3001/api/auths/"

// Register user
const registerServ = async (userData) => {
  const response = await axios.post( API_URL + "register", userData)

  if (response.data) {
    localStorage.setItem('user', response.data)
  }

  return response.data
}

// Login user
const loginServ = async (userData) => {
  try {
    const response = await axios.post(API_URL + "login", userData)

  if (response.data) {
    localStorage.setItem('user', response.data)
    console.log("was here2")
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
}

export default authService
