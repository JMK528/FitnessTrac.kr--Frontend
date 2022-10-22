import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Activities = ({ activities,token }) => {
    
        const [searchTerm, setSearchTerm] = useState('');
        function activityMatches(activities, string) {
            const { name, description } = activities;
            if (name.toLowerCase().includes(string.toLowerCase()) || description.toLowerCase().includes(string.toLowerCase())) {
                return activities;
            }
        }
        const filteredActivities = activities.filter(activity => activityMatches(activity, searchTerm));
        const activitiesToDisplay = searchTerm.length ? filteredActivities : activities;
        return (
            <div className="main-activity-div">
                <div >
                    <form onSubmit={(event) => {
                        event.preventDefault();
                    }}>

                        <input style={{ width: '100%' }}
                            type='text'
                            label='Search'
                            onChange={(event) => setSearchTerm(event.target.value)}
                        ></input>

                    </form>
                </div>
                <div>
                    {token ? (

                        <Link style={{ textDecoration: 'none' }} to='/activities/create-activity'> <button
                            style={
                                { height: '4rem', width: '100%', borderRadius: 15, background: '#001242' }
                            } variant='contained'
                            type='submit'>
                            Create Activity
                        </button></Link>

                    ) : (
                        null
                    )}
                    {
                        activitiesToDisplay.map((activity) => {
                            const { name, description,id } = activity;
                            return (

                                <div key={id} >
                                    <h3>{name}</h3>
                                    <p>Description: {description}</p>

                                    {
                                        (
                                            <div>

                                                <Link
                                                    style={{
                                                        textDecoration: 'none'
                                                    }}
                                                    to={`/activities/edit-activity/${id}`}
                                                ><button
                                                    style={{
                                                        height: '3rem',
                                                        margin: '.25rem', width: '100%', borderRadius: 15, backgroundColor: ' #000022',
                                                    }}
                                                    variant='contained'
                                                    type='submit'>Edit Activity
                                                    </button> </Link>

                                            </div>

                                        )
                                    }
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        )
    
}
 export default Activities;