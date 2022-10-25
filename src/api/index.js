import { json } from "react-router-dom";

const baseURL = 'https://fitnesstrac-kr.herokuapp.com/api'

export const getActivities = async () => {
  try {
    const response = await fetch(`${baseURL}/activities`, {
      headers: {
        'Content-Type': 'application/json'       
      }
    });
    const results = await response.json();     
    return results;
  } catch (error) {
    console.log('error getting all activities')
  }
}

export const registerUser = async (username, password) => {
    try {
      const response = await fetch(`${baseURL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        
            username: username,
            password: password
         
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

            username: username,
            password: password
          
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

  export const createActivity = async (token, { name, description}) => {
    try {
      const response = await fetch(`${baseURL}/posts`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
         activity: {
            name,
            description,            
          }
        })
      })
      const results = await response.json();
      return (results)
    } catch (error) {
      console.log('error creating a new activity')
    }
  }
  
export const getRoutines = async() => {
      try {
        const response = await fetch(`${baseURL}/routines`, {
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const result = await response.json();
        return result
      } catch (error) {
        console.log('error getting all public routines')
      } }

export const createRoutine = async(token, {name, goal, isPublic}) => {
  try {
    const response = await fetch(`${baseURL}/routines`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic
      })
    })
    const result = await response.json()
    return result
  } catch (error) {
    console.log('error creating routine')
  }
}


export const getMyRoutines = async(token, username) => {
  try {
    const response = await fetch(`${baseURL}/users/${username}/routines`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    const result = await response.json();
    return result
  } catch (error) {
    console.log(`error getting all routines for ${username}`)
  }
}

export const updateRoutine = async(token, {name, goal, isPublic, id}) => {
  console.log('beginning update')
  try {
    const response = await fetch(`${baseURL}/routines/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic
      })
    })
    const result = await response.json();
    return result
  } catch (error) {
    console.log(`error updating routine ${name}`)
  }
}