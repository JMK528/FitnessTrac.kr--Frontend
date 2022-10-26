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
  EditAnActivity,
 
  MyRoutines,
  Routines
} from './components';

import { 
  getActivities,
  getUserDetails,
  getRoutines,
} from './api';




const App = () => {
  const [activities, setActivities] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});




  const navigate = useNavigate();

  function logout() {
    window.localStorage.removeItem('token');
    setToken('');
    setUser({});
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
    if (results.success) {
      setUser(results.data);
    } else {
      console.log(results.error);
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  useEffect(() => {
    fetchRoutines()
  }, [token])

  useEffect(() => {
    getMe();
  }, [token])

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
                path='/MyRoutines'
                element={<MyRoutines
                  user={user}
                  navigate={navigate} />}
              />
              <Route
                path='/routines'
                element={<Routines
                  user={user}
                  navigate={navigate} 
                  routines={routines}/>}
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
                path='/activities/create-activity'
                element={<CreateAnActivity
                  fetchActivities={fetchActivities}
                  token={token}
                  navigate={navigate} />}
              />  
              <Route
                path='/activities/edit-activity/:activityID'
                element={<EditAnActivity
                  fetchActivities={fetchActivities}
                  navigate={navigate}
                  activities={activities}
                  token={token}
                   />}
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