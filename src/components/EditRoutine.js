import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import {attachRoutineActivity, getActivities} from '../api'


const AddActivityToRoutine = ({routineId, fetchMyRoutines, allActivities}) => {
    const [activityId, setActivityId] = useState(null)
    const [count, setCount] = useState(0)
    const [duration, setDuration] = useState(0)
    
    async function addActivity() {
        const newRoutineActivity = {
            routineId,
            count,
            duration,
            activityId
        }
        console.log(newRoutineActivity)
        const response = await attachRoutineActivity(newRoutineActivity)
        console.log(response)
    }


    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            addActivity();
            fetchMyRoutines();
        }}>
        <select 
        name="activities"
        id="select-activity"
        value={activityId} 
        onChange={(event) => setActivityId(event.target.value * 1)}>
        <option value="">select an option</option>
        {/* map over the classificationList, return an <option /> */
        allActivities.map((activity, idx) => {
          return <option key={idx} value={activity.id}>{activity.name}</option>
        })
        }
      </select>
      <input
            className='textInput'
            type='text'
            placeholder='count'
            onChange={(event) => setCount(event.target.value * 1)}
            />
        <input
            className='textInput'
            type='text'
            placeholder='duration'
            onChange={(event) => setDuration(event.target.value * 1)}
            />
        <button type='submit'>Add Activity</button>
        </form>
    )
}

const EditRoutine = ({myRoutines, user, navigate, fetchMyRoutines, updateRoutine, token, allActivities, getMe}) => {
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
                    <AddActivityToRoutine routineId={_id} fetchMyRoutines={fetchMyRoutines} allActivities={allActivities} />
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