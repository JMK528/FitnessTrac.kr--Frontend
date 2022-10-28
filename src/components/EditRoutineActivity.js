import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom'
import { updateRoutineActivity } from '../api';

const EditRoutineActivity = ({token}) => {
    const { _id } = useParams();

    const [newCount, setNewCount] = useState('')
    const [newDuration, setNewDuration] = useState('')

    async function editRoutineActivity() {
        const updatedRoutineActivity = {
            count: newCount,
            duration: newDuration,
            _id: _id
        }
        const response = await updateRoutineActivity(token, updatedRoutineActivity)
    }


    return (
        <h1>in progress</h1>
    )
}


export default EditRoutineActivity