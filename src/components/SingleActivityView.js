import React from "react";
import { useParams } from "react-router-dom";

const SingleActivityView = ({ activities }) => {
    
    const { activityID } = useParams();

    if (activities.length) {
        const [currentActivity] = activities.filter(activities => activities.id === activityID);
        const { name, description, updatedAt, createdAt } = currentActivity;

        return (
            <div className="main -single-view-div">
                <div>
                    <h3>{name}</h3>
                    <p>Description: {description}</p>
                    
                </div>
              
                <div>
                    <p className="singleActivityStamp">Created At: {createdAt}</p>
                    <p className="singleActivityStamp">Updated At: {updatedAt}</p>
                </div>
            </div>
        )
    } else {
        return (
            <h1>Waiting for Activities...</h1>
        )
    }
}
export default SingleActivityView;