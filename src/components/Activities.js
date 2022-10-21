import React, { Fragment } from 'react';


const Activities = ({activities})  => {
   
    return(

        <div className='main-div-activities'>
        {
            activities.map((activity) => {
             const {id, name, description} = activity
        return(
            <Fragment key={id}>                              
                <h3>Name:{name}</h3>
                <p>Description: {description}</p>
            </Fragment>            
            )
            })
        }
       </div>
    )
}






export default Activities;