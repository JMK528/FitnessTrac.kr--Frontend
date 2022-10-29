import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import { getMyRoutines } from '../api';

const UserRoutines = ({ token })  => {
    const [searchTerm, setSearchTerm] = useState('');
    const { username } = useParams()
    const [userRoutines, setUserRoutines] = useState([])

    async function fetchUserRoutines() {
        const results = await getMyRoutines(token, username)
        setUserRoutines(results)
      }





    const routineMatches = (routine, text) => {
        if(routine.name.toUpperCase().includes(text.toUpperCase())) return true
    }
    const filteredRoutines = userRoutines.filter(routine => routineMatches(routine, searchTerm))
    const RoutinesToDisplay = searchTerm.length ? filteredRoutines : userRoutines;


    useEffect(() => {
        fetchUserRoutines();
      }, [username])

    return(
        <div className='myRoutinesDiv'>
        <div className='routinesDiv'>
            <form>
                <label>Search</label>
                <input className='textInput' type='text' onChange={(event) => setSearchTerm(event.target.value)}/>
            </form>
       {
        RoutinesToDisplay.map((routine) => {
            const {activities, creatorId, creatorName, goal, id, isPublic, name} = routine;
            return (
                <div className='routine' key={id}>
                    <h3>{name}</h3>
                    <p>Goal: {goal}</p>
                    <p>Creator: {creatorName}</p>
                    <h4>Activities</h4>
                    {
                        activities.map((activity) => {
                            const {name, description, duration, count, id} = activity;
                            return (
                                <li key={id}>
                                    <h5>{name}</h5>
                                    <p>Description: {description}</p>
                                    <p>Duration: {duration}</p>
                                    <p>Count: {count}</p>
                                </li>
                            )
                        })
                    }
                </div>
            )
        })
       }
       </div>
    
       </div>
    )
}



export default UserRoutines;