import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { updateActivity } from '../api';
import {
  Button,
  Typography,
  TextField,
  Card,
} from "@mui/material";


const EditAnActivity = ({ activities, fetchActivities, navigate, token }) => {
  const { activityID } = useParams();
  if (activities.length) {
    const currentActivity = activities.filter(activity => activity.id === parseInt(activityID));

    console.log(activities)
    const { name, description } = currentActivity;

    const [newName, setNewName] = useState(name);
    const [newDescription, setNewDescription] = useState(description);


    async function editActivity() {
      const updatedActivity = {
        name: newName,
        description: newDescription,
        id: activityID
      }
      console.log("something", token)
      await updateActivity(updatedActivity, token)
      navigate('/activities')
      fetchActivities()
    }

    return (

      <div className="edit-main-div" >
        <form onSubmit={(event) => {
          event.preventDefault();
          editActivity();


        }}>
          <h1>Edit Activity</h1>

          <input style={{ width: '100%', padding: '.5rem', margin: '.5rem', background: 'whitesmoke' }}
            type='text'
            placeholder={name}
            onChange={(event) => setNewName(event.target.value)}
          />
          <input style={{ width: '100%', padding: '.5rem', margin: '.5rem', background: 'whitesmoke' }}
            type='text'
            placeholder={description}
            onChange={(event) => setNewDescription(event.target.value)}
          />

          <button style={{
            marginTop: "2%",
            width: "100%",
            borderRadius: 35,
            background: "#55586F",
            opacity: "70%",
            color: "#24A6D1",
            borderColor: "#55586F",
          }}
            type="submit"
            variant="outlined"
            onClick={() => {
              editActivity();
            }}>Edit Activity</button>
        </form>
      </div>
    )
  }
  return <h1>Activities Loading</h1>
}

export default EditAnActivity;