import React, {useState, useEffect} from 'react';
import { updateRoutineActivity } from '../api';

const EditRoutineActivity = ({token, fetchMyRoutines, routineActivityId, count, duration}) => {
    const [newCount, setNewCount] = useState(count)
    const [newDuration, setNewDuration] = useState(duration)

    const [editing, setEditing] = useState(false)

    async function editRoutineActivity() {
        const updatedRoutineActivity = {
            count: newCount,
            duration: newDuration,
            _id: routineActivityId
        }
        const response = await updateRoutineActivity(token, updatedRoutineActivity)
    }


    return (
        <div className='editRoutineActivityDiv'>
    {editing
        ?
        <form onSubmit={(event) => {
            event.preventDefault();
            editRoutineActivity();
            fetchMyRoutines();
            setEditing(false)
        }}>
            <input
            className='textInput'
            type='text'
            placeholder={newDuration}
            onChange={(event) => setNewDuration(event.target.value)}
            />
            <input
            className='textInput'
            type='text'
            placeholder={newCount}
            onChange={(event) => setNewCount(event.target.value)}
            />
            <button type='submit'>Confirm Edits</button>
            <button onClick={() => setEditing(false)}>cancel editing</button>
        </form>
        :
        <button onClick={() => setEditing(true)}>Edit</button>
    }
        </div>
    )
}


export default EditRoutineActivity