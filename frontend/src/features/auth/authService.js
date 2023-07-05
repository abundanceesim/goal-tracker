import axios from 'axios'

//the app knows to look into 'localhost:5000/' first because
// it's set in the proxy property of package.json (in frontend folder!)
const API_URL = '/api/users/'

// Register user
const register  =  async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const logout = async (userData) => {
  localStorage.removeItem('user')
};

const authService = {
    register,
    logout,
    login
}

export default authService