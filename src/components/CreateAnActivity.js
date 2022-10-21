import React, {useState} from "react";
import {createActivity} from '../api';



const CreateAnActivity = ( { token, fetchActivities,navigate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const newActivity = {
    name,
    description,  
  }
  
 
  async function addActivity() {
    const results = await createActivity(token, newActivity);
    console.log(results)    
    fetchActivities();
    navigate('/activities')
    

  }
    return (
      
      <form onSubmit={(event) => {
        event.preventDefault();
        addPost();
        
      }}>
        <input
          type='text'
          label="Name*"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type='text'
          label="Description*"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />          
        <button style={{ height: '3rem', margin: '.25rem' }} variant='contained' type='submit' onClick={(event) => {
          event.preventDefault();
          addActivity();
        }}>Create A New Activity</button>
        
      </form> 
       
  )}
  
  export default CreateAnActivity;