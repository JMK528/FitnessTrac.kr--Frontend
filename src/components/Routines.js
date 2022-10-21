import React, { useState } from 'react';


const Routines = ({ routines, token, fetchRoutines})  => {
    const [searchTerm, setSearchTerm] = useState('');
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
                    {
                        activities.map((activity) => {
                            const {name, description, duration, count} = activity;
                            return (
                                <>
                                    <p>{name}</p>
                                    <p>Description: {description}</p>
                                    <p>Duration: {duration}</p>
                                    <p>Count: {count}</p>
                                </>
                            )
                        })
                    }
                </div>
            )
        })
       }
       </div>
    )
}







export default Routines;