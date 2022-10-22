import React, { useState } from "react";
import { useParams, navigate } from "react-router-dom";
import { updateActivity, deleteActivity } from '../api';

const EditAnActivity = ({ activities, token, fetchActivities, navigate }) => {
  const { activityID } = useParams();

  const [currentActivity] = activities.filter(activity => activity.id === activityID);

  const { name, description } = currentActivity;

  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);


  async function editActivity() {
    const updatedActivity = {
      token: token,
      name: newName,
      description: newDescription,
      id: activityID
    }
    await updateActivity(updatedActivity)
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
          placeholder={title}
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
        <button style={{
          marginBottom: "2%",
          marginTop: "2%",
          width: "100%",
          borderRadius: 35,
          background: "#55586F",
          opacity: "70%",
          color: "red",
          borderColor: "#55586F",
        }}
          type="submit"
          color="error"
          variant="outlined" onClick={() => {
            deleteActivity(token, activityID);
            navigate('/activities')
            fetchActivities()
          }}> Delete Activity</button>

      </form>
    </div>
  )
}

export default EditAnActivity;