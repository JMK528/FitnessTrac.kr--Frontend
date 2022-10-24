import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import './style.css';

import {
  Navbar,
  Home,
  Register,
  Login,
  Activities,
  CreateAnActivity,
  MyRoutines,
  Routines
} from './components';

import { 
  getActivities,
  getUserDetails,
  getRoutines,
  createRoutine,
  getMyRoutines
} from './api';



const App = () => {
  const [activities, setActivities] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [myRoutines, setMyRoutines] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});


  const navigate = useNavigate();

  function logout() {
    window.localStorage.removeItem('token');
    setToken('');
    setUser({});
  }

  async function fetchMyRoutines() {
    const results = await getMyRoutines(token, user.username)
    setMyRoutines(results)
  }

  async function fetchActivities() {
    const results = await getActivities()    
    setActivities(results);
    
  }

  async function fetchRoutines() {
    const results = await getRoutines()
    setRoutines(results)
  }

  async function getMe() {
    const storedToken = window.localStorage.getItem('token');

    if (!token) {
      if (storedToken) {
        setToken(storedToken);
      }
      return;
    }

    const results = await getUserDetails(token);
    if (results) {
      setUser(results);
    } else {
      console.log('failed to get user details', results);
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  
  useEffect(() => {
    fetchRoutines()
  }, [token])
  
  //   useEffect(() => {
    //     fetchPosts()
    //   }, [token])
    
    useEffect(() => {
      getMe();
    }, [token])
    
    useEffect(() => {
      fetchMyRoutines()
    }, [user])

  return (

        <header>
          <nav>
            <Navbar 
            logout={logout} token={token} 
            />
            <Routes>
              <Route
                path='/'
                element={<Home />}
              />
              <Route
                path='/activities'
                element={<Activities
                  activities={activities}                 
                  token={token}
                  navigate={navigate} 
                  />}
              />
                  <Route
                path='/myroutines'
                element={<MyRoutines
                  navigate={navigate} 
                  myRoutines={myRoutines}
                  createRoutine={createRoutine}
                  token={token}
                  getMe={getMe}
                  />}
              />
              <Route
                path='/routines'
                element={<Routines
                  user={user}
                  navigate={navigate} 
                  routines={routines}/>}
              />
          
              <Route
                path='/posts/create-activity'
                element={<CreateAnActivity
                  fetchActivities={fetchActivities}
                  token={token}
                  navigate={navigate} />}
              />        
              <Route
                path='/login'
                element={<Login
                  setToken={setToken}
                  navigate={navigate} />} />
              <Route
                path='/register'
                element={<Register
                  setToken={setToken}
                  token={token}
                  navigate={navigate} />} />
            </Routes>
          </nav>
        </header>   
  )
}


const container = document.querySelector('#root');
const root = ReactDOM.createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


/*
Login
Registeration
Activities
MyRoutines
Navbar
Routines
CreateRoutine

*/