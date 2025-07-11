import './showtasks.css'

const ShowTasks=({data,onDelete,onMarkAsDone})=>{
        const {id,peru,deadline,priority,status}=data
       


    const handleDeletebtn=()=>{
        onDelete(id)
        

          
    }

    console.log(data)
    return(
         <li>
            <div>
                <h1>{peru}</h1>
                    <p>{priority}</p>
                    <p>{deadline}</p>
            </div>
            <div className='div2'>


            
            <button onClick={()=>{onDelete(id)}}>Delete</button>
            <button onClick={()=>onMarkAsDone(id)}>Mark As Done!</button>
          </div>  
          <p>{`Status${status}`}</p>
         </li>
    )
   

}

export default ShowTasks;