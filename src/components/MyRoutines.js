import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'


const myRoutines = ({ myRoutines, token, createRoutine, fetchMyRoutines, getMe})  => {
    const [searchTerm, setSearchTerm] = useState('');
    
    
    const routineMatches = (routine, text) => {
        if(routine.name.toUpperCase().includes(text.toUpperCase())) return true
    }
    const filteredRoutines = myRoutines.filter(routine => routineMatches(routine, searchTerm))
    const RoutinesToDisplay = searchTerm.length ? filteredRoutines : myRoutines;

    useEffect(() => {
        getMe();
      }, [token])

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
                    <Link className='routineButtons' to={`/myroutines/editroutine/${id}`}>Edit</Link>
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
       <div className='createRoutineDiv'>
            <CreateRoutine 
            createRoutine={createRoutine}
            token={token}
            fetchMyRoutines={fetchMyRoutines}
            />
       </div>
       </div>
    )
}

const CreateRoutine = ({fetchMyRoutines, token, createRoutine}) => {
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    const newRoutine = {
        name,
        goal,
        isPublic
    }

    async function addRoutine() {
        const result = await createRoutine(token, newRoutine)
        fetchMyRoutines();
    }
    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            addRoutine()
            fetchMyRoutines()}}>
            <input className='textInput' type='text' placeholder='name' value={name} onChange={(event) => setName(event.target.value)}/>
            <input className='textInput' type='text' placeholder='goal' value={goal} onChange={(event) => setGoal(event.target.value)}/>
            <span>isPublic
            <input
            type='checkbox'
            onChange={(event) => setIsPublic(event.target.checked)}
            />
            </span>
            <button type='submit'>Confirm Create Routine</button>
            
        </form>
    )
}




export default myRoutines;