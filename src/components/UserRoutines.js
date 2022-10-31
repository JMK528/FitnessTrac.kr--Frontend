import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import { getMyRoutines } from '../api';
import {
    Button,
    Typography,
    TextField,
    Card,
  } from "@mui/material";

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
        <Card style={{ padding: '.5rem', margin: '.5rem', background: '#247BA0' }} elevation={6} >
        <div className='myRoutinesDiv'>
        <div className='routinesDiv'>
            <form>
            <Card style={{ padding: '.5rem', margin: '.5rem', background: '#C3B299', }} >
            <TextField style={{ width: '100%', background: '#FFFCFF' }}
                            type='text'
                            label='Search'
                            onChange={(event) => setSearchTerm(event.target.value)}
                            ></TextField>
                </Card>
            </form>
       {
        RoutinesToDisplay.map((routine) => {
            const {activities, creatorId, creatorName, goal, id, isPublic, name} = routine;
            return (
                <Card key={id} style={{ padding: '.5rem', margin: '.5rem', background: '#FFFCFF', }}>
                <div className='routine' key={id}>
                    <h3>{name}</h3>
                    <p>Goal: {goal}</p>
                    <p>Creator: {creatorName}</p>
                    <h4>Activities</h4>
                    {
                        activities.map((activity) => {
                            const {name, description, duration, count, id} = activity;
                            return (
                                <Card key={id} style={{ padding: '.5rem', margin: '.5rem', background: '#FFFCFF', }}>
                                <li key={id}>
                                <Link style={{
                                                        textDecoration: 'none'
                                                    }}
                                                        to={`/activities/routines/${id}`}><Button
                                                        style={{
                                                            height: '3rem',
                                                            margin: '.25rem', width: '100%', borderRadius: 15, backgroundColor: ' #50514F',
                                                        }}
                                                        variant='contained'
                                                        type='submit'><h5>{name}</h5></Button></Link>
                                    <p>Description: {description}</p>
                                    <p>Duration: {duration}</p>
                                    <p>Count: {count}</p>
                                </li>
                                 </Card>
                            )
                        })
                    }
                </div>
                 </Card>
            )
        })
       }
       </div>
    
       </div>
       </Card>
    )
}



export default UserRoutines;