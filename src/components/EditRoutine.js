import React, {useState} from 'react';
import { useParams } from 'react-router-dom'



const EditRoutine = ({myRoutines, user, navigate, fetchMyRoutines, updateRoutine, token}) => {
    const { _id } = useParams();


    const [currentRoutine] = myRoutines.filter(routine => routine.id === _id * 1);
    const {activities, creatorId, creatorName, goal, id, isPublic, name} = currentRoutine;

    const [addActivity, setAddActivity] = useState(false)

    const [newName, setNewName] = useState(name)
    const [newGoal, setNewGoal] = useState(goal)
    const [newIsPublic, setNewIsPublic] = useState(isPublic)

    async function editRoutine() {
        const updatedRoutine = {
            name: newName,
            goal: newGoal,
            isPublic: newIsPublic,
            id,
        }
        const response = await updateRoutine(token, updatedRoutine)
    }
    return (
        <div className='editRoutineDiv'>
        <form onSubmit={(event) => {
            event.preventDefault();
            editRoutine();
            fetchMyRoutines();
            navigate('/myroutines')
        }}>
            <input
            className='textInput'
            type='text'
            placeholder={name}
            onChange={(event) => setNewName(event.target.value)}
            />
            <input
            className='textInput'
            type='text'
            placeholder={goal}
            onChange={(event) => setNewGoal(event.target.value)}
            />
            <label>isPublic</label>
            <input
            type='checkbox'
            onChange={(event) => setNewIsPublic(event.target.checked)}
            />
            <button type='submit'>Edit Routine</button>
        </form>
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
}

export default EditRoutine;