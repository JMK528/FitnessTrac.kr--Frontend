import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import {activityRoutines} from '../api';


const ActivityRoutines = ({ activities }) => {
    const { activityId } = useParams();
    const [routines,setRoutines] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    async function fetchActivityRoutines() {        
        const results = await activityRoutines(activityId)
        setRoutines(results);
    
      }
useEffect(()=>{
    fetchActivityRoutines()
},[])
const routineMatches = (routine, text) => {
    if(routine.name.toUpperCase().includes(text.toUpperCase())) return true
}
    const filteredRoutines = routines.filter(routine => routineMatches(routine, searchTerm))
    const RoutinesToDisplay = searchTerm.length ? filteredRoutines : routines;
    return(
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
                    <ul>
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
                    </ul>
                </div>
            )
        })
       }
       </div>
    )
}






export default ActivityRoutines;