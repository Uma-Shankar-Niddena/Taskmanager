import './taskform.css';
import React, { useState,useEffect } from 'react';
import ShowTasks from './showTasks';
import {v4 as uuidv4} from 'uuid'



const TaskForm = () => { 
       
    const getInitialData = () => {
        const saved = localStorage.getItem('finalData');
        return saved ? JSON.parse(saved) : [];
      };

    const [submitclicked,setSubm]=useState("false")
    const [finalData,setFinalData]=useState(getInitialData)
    const [formData, setFormData] = useState({
       id:'',
        peru: '',
        priority: '',
        deadline: '',
        status:''
    });

    const [submittedData, setSubmittedData] = useState(null);

    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    useEffect(() => {
        localStorage.setItem('finalData', JSON.stringify(finalData));
      }, [finalData]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
         setSubm("true")
        let  newID=uuidv4()
         
        setSubmittedData(formData);
        const ram={
            ...submittedData,    // Spread existing submittedData properties
            ...formData,         // Spread formData properties (overrides any duplicates)
            id: uuidv4(),
            status:"pending"       // Add new UUID (overrides any existing id)
          };
        setFinalData(prevData=>[...prevData,ram])
        
        

        // Clear the form after submission
       
        setFormData({
            
            peru: '',
            priority: '',
            deadline: ''
        });
    };

    const onDelete=(withID)=>{
    const filterData=finalData.filter(each=>each.id!==withID)
    setFinalData(filterData)


    }
    const onMarkAsDone=(itsId)=>{
       const  updateTasks=finalData.map(each=>(
            each.id===itsId?{...each,status:"Done"}:each
        ))
        setFinalData(updateTasks)
    }
    

    return (
        <div>
            <form onSubmit={handleSubmit}>   
                <h3>Task Name</h3>
                <input 
                    type="text" 
                    name="peru" 
                    value={formData.peru} 
                    className="forname" 
                    id="forName" 
                    onChange={onChangeHandle} 
                    required 
                />
                
                <h3>Priority</h3>
                <select 
                    name="priority"
                    value={formData.priority}
                    id="foroptions" 
                    onChange={onChangeHandle}
                    required
                >
                    <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                
                <h3>Deadline</h3>
                <input 
                    type="date" 
                    name="deadline"
                    value={formData.deadline}
                    onChange={onChangeHandle}
                    required
                />
                
                <button type="submit" className="button">Submit</button>
            </form>
            <ul>
              { 
                finalData.map(each=>(
                    submitclicked && <ShowTasks key={each.id} data={each} onDelete={onDelete} onMarkAsDone={onMarkAsDone}/>
            ))
               }

            </ul>
        </div>
    );
};

export default TaskForm;