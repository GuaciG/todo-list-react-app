import React, { useState } from 'react';
import './AddTodoForm.css';
import { useForm } from 'react-hook-form';  
//library for managing state, validation, errors, etc in forms

const AddTodoForm = (props) => {   //it receives addTodo and setStatus as props
    //we need states for error and success
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const {register, handleSubmit} = useForm();


    
    const onSubmit = (data, e) => {
        // data = description
        //console.log(data);

        //manage errors, 
        //if data without whitespaces is empty, setError message 
        if ( data.description.trim() === '') {
            setError('Please, enter a new task');
            //and reset() field. 
            return e.target.reset();
        } 
        
        // if not, send data to addTodo function to create a new todo
        props.addTodo(data);
        
        //remove error
        setError(null);  
        //clear field
        e.target.reset();
        //setSuccess message for 1.5 seconds. 
        setSuccess('New task was added!');
        setTimeout(() => {
            setSuccess(null);
        }, 1500);
            
    };

    //Here we set the status with onChange event in select element. 
    const statusHandler = (e) => {
        //e.target.value = option's value
        props.setStatus(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>  
            { //always {} to write javascript inside jsx
                //if error exists show error-div with error message
                error && 
                (
                    <div className="error-div">
                        { error }
                    </div>
                )

            }
            { //always {} to write javascript inside jsx
                //if success exists show success-div with success message
                success && 
                (
                    <div className="success-div">
                        { success }
                    </div>
                )

            }
            <div className="form-div">
                <input 
                    className="todo-input" 
                    type="text"
                    name="description"
                    placeholder="Enter new task" 
                    autoFocus
                    ref={
                        register
                    }
                />
                <button 
                    className="todo-button"
                    type="submit"
                    >ADD
                </button>
            </div>
            <div className="select-div">
                <select 
                    onChange={statusHandler}
                    className="filter-todo"
                    name="todos"
                    >
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </form>
    );
};

export default AddTodoForm;

