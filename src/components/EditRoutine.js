import React, {useState} from 'react';
import { useParams } from 'react-router-dom'
import { updateRoutine } from '../api';


const EditRoutine = ({myRoutines, user, navigate, fetchMyRoutines}) => {
    const { _id } = useParams();


    const [currentRoutine] = myRoutines.filter(routine => routine._id === id * 1);
    const {activities, creatorId, creatorName, goal, id, isPublic, name} = routine;

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
        console.log(response)
    }

    return (
        <h1>edit routine</h1>
    )
}

export default EditRoutine;