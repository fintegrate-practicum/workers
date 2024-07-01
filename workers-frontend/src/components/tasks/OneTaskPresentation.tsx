import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress'; 

const SingleTask = () => {
    const { taskId } = useParams(); 
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
            const fetchTask = async () => {
            try {
               
                const response = await axios.get(`http://localhost:3001/tasks/${taskId}`);
                setTask(response.data); 
                setLoading(false);
            } catch (err) {
                setError(err.message); 
                setLoading(false); 
            }
        };
        fetchTask();
    }, [taskId]);

    if (loading) {
        return <div><CircularProgress /></div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!task) {
        return <div>No task found</div>;
    }
    return (
        <div className="task-details">
            <h2>{task.taskName}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Target Date: {new Date(task.targetDate).toLocaleDateString()}</p>
            <p>Assigned to: {task.employee.join(', ')}</p>
            <p>Urgency: {task.urgency}</p>
        </div>
    );
};

export default SingleTask;
