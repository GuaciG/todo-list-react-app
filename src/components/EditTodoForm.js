import React, { useState } from 'react';
import './EditTodoForm.css';
import { useForm } from 'react-hook-form';
//library for managing state, validation, errors, etc in forms

const EditTodoForm = (props) => {   //it receives currentTodo and updateTodo as props
    
    //console.log(props.currentTodo);

    //we need a state for error and success
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const {register, handleSubmit, setValue} = useForm({
        defaultValues: props.currentTodo
    });

    setValue('description', props.currentTodo.description);

    
    
    const onSubmit = (data, e) => {
        // data = description
        //console.log(data);

        //manage errors, 
        //if data without whitespaces is empty, setError message
        if ( data.description.trim() === '') {
            setError('Please, enter your task');
            return;
        }

        // if not, send data to updateTodo function to create a edited todo
        data.id = props.currentTodo.id;
        data.completed = props.currentTodo.completed;
        props.updateTodo(props.currentTodo.id, data);

        //remove error
        setError(null);
        //clear field
        e.target.reset();
        //setSuccess message for 1.5 seconds.
        setSuccess('Your task was edited!');
        setTimeout(() => {
            setSuccess(null);
        }, 1500);
            
    };

    //Here we set the status with onChange event in select element. 
    const statusHandler = (e) => {
        props.setStatus(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {  //always {} to write javascript inside jsx
                //if error exists show error-div with error message
                error && 
                (
                    <div className="error-div">
                        { error }
                    </div>
                )

            }
            {  //always {} to write javascript inside jsx
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
                    placeholder="Enter your task" 
                    autoFocus
                    ref={
                        register
                    }
                />
                <button 
                    className="todo-button"
                    type="submit"
                    >EDIT
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

export default EditTodoForm;

