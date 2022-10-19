const baseURL = 'https://fitnesstrac-kr.herokuapp.com/api'

export const registerUser = async (username, password) => {
    try {
      const response = await fetch(`${baseURL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password
          }
        })
      })
      const result = await response.json();
      return result;
    } catch (error) {
      console.log('error registering user')
    }
  }


export const loginUser = async (username, password) => {
    try {
      const response = await fetch(`${baseURL}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password
          }
        })
      })
      const result = await response.json();
      return result;
  
    } catch (error) {
      console.log('error logging in user')
    }
  }



  export const getUserDetails = async (token) => {
    try {
      const response = await fetch(`${baseURL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      const result = await response.json();
      return result
  
    } catch (error) {
      console.log('error getting users details')
    }
  }