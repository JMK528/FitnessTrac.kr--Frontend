import React, {useState, useEffect} from 'react';
import { updateRoutineActivity } from '../api';
import {
  Button,
  Typography,
  TextField,
  Card,
} from "@mui/material";

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
        <Card elevation={6} style={{ background: '#50514F', margin:'2rem 4rem ',
      background: '#50514F',
      color:'#FFFCFF',
      textAlign:'center',
      alignContent:'center'    
    
      }}> 
        <div className='editRoutineActivityDiv'>
    {editing
        ?
        
        <form onSubmit={(event) => {
            event.preventDefault();
            editRoutineActivity();
            fetchMyRoutines();
            setEditing(false)
        }}>
              <TextField style={{ 
          flexWrap:'center',
          margin: '.25rem',         
           width: '100%', 
           backgroundColor: '#FFFCFF',
           
           }}
            className='textInput'
            type='text'
            placeholder={newDuration}
            onChange={(event) => setNewDuration(event.target.value)}
            />
              <TextField style={{ 
          flexWrap:'center',
          margin: '.25rem',         
           width: '100%', 
           backgroundColor: '#FFFCFF',
           
           }}
            className='textInput'
            type='text'
            placeholder={newCount}
            onChange={(event) => setNewCount(event.target.value)}
            />
            <Button style={{
            marginTop: "2%",
            width: "100%",
            borderRadius: 35,
            background: "#001242",
            opacity: "70%",
            color: "#FFFCFF",
            borderColor: "#24A6D1",
          }} type='submit'>Confirm Edits</Button>
            <Button style={{
            marginTop: "2%",
            width: "100%",
            borderRadius: 35,
            background: "#001242",
            opacity: "70%",
            color: "#FFFCFF",
            borderColor: "#24A6D1",
          }} onClick={() => setEditing(false)}>Cancel Edit</Button>
        </form>
        :
        <Button style={{
            marginTop: "2%",
            width: "100%",
            borderRadius: 35,
            background: "#001242",
            opacity: "70%",
            color: "#FFFCFF",
            borderColor: "#24A6D1",
          }} onClick={() => setEditing(true)}>Edit</Button>
    }
        </div>
        </Card>
    )
}


export default EditRoutineActivity