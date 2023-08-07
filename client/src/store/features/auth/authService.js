import axios from 'axios'


const API_URL = "http://localhost:3001/api/auths/"
//const user = JSON.parse(localStorage.getItem('user'))

// Register user
const registerServ = async (userData) => {
  try {
    const response = await axios.post(API_URL + "register", userData)
  if (response.data) {
    
    localStorage.setItem('user', JSON.stringify(response.data))
  }
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
  doctorRegisterServ
}

export default authService
