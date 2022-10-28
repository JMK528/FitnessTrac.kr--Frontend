import React, {useState} from "react";
import {createActivity} from '../api';
import { Popover, Button , Typography } from "@mui/material";


const CreateAnActivity = ( { token, fetchActivities,navigate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  // const[open,setOpen] = useState(false)
  const[error,setError] = useState('')
  const newActivity = {
    name,
    description,  
  }
  // const [anchorEl, setAnchorEl] = React.useState(null); 
//  const handleClose = () =>{
//   setOpen(false)
//  }

const [anchorEl, setAnchorEl] = React.useState(null);
 const[open,setOpen] = useState(false)
const handleClick = async (event) => {
  setAnchorEl(event.currentTarget);
  const results = await createActivity(token, newActivity);
    console.log(results,"TEST")  
    if("error"in results){
      console.log(open)
      setOpen(true)
      setAnchorEl(event.currentTarget);
      console.log(open,'LINE30')
      setError(results.error)
    } else{
      fetchActivities();
      navigate('/activities')
      handleClose();
    }
};

const handleClose = () => {
  setAnchorEl(null);
};

// const open = (Boolean(anchorEl));
const id = open ? 'simple-popover' : undefined;
 
async function addActivity(event) {
    const results = await createActivity(token, newActivity);
    console.log(results,"TEST")  
    if("error"in results){
      setOpen(true)
      setAnchorEl(event.currentTarget);
      
      setError(results.error)
    } else{
      fetchActivities();
      navigate('/activities')
      handleClose();
    }
    
     

  }
    return (
      
      <form onSubmit={(event) => {
        event.preventDefault();
        addActivity();
        
      }}>
        
        
        <h1>Create An Activity</h1>
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
        {/* <button style={{ height: '3rem', margin: '.25rem' }} variant='contained' type='submit' onClick={(event) => {
          event.preventDefault();
          addActivity();
        }}>Create A New Activity</button> */}
        {/* <div>
      <Button style={{ height: '3rem', margin: '.25rem' }} variant="contained" type='submit' onClick={(event) => {
          event.preventDefault();
          addActivity(event);}}>
      Create A New Activity
      </Button>
      <Popover        
        open={open}
        anchorEl={anchorEl}        
        onClose={handleClose}
        // anchorOrigin={{
        //   vertical: 'bottom',
        //   horizontal: 'left',
        // }}
      >
        <Typography sx={{ p: 2 }}>{error}</Typography>
      </Popover>
    </div> */}
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </div>
      </form> 
       
  )}
  
  export default CreateAnActivity;