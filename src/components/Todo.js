import React from 'react';
import './Todo.css';

const Todo = (props) => {   // it receives todo, deleteTodo, completeTodo, editRow as props.
    return ( 

        <div className="todo" key={props.todo.id}>
            <button 
                onClick={() => props.completeTodo(props.todo)}
                className={`complete-btn ${props.todo.completed ? "done" : ""}`}>
                <i className="fas fa-check"></i>
            </button>
            <li className={`todo-item ${props.todo.completed ? "completed" : ""}`}>{props.todo.description}</li>
            <button 
                onClick={() => {props.editRow(props.todo)}}
                className="edit-btn">
                <i className="fas fa-pencil-alt"></i>
            </button>
            <button 
                onClick={() => {props.deleteTodo(props.todo.id)}}
                className="trash-btn">
                <i className="fas fa-trash"></i>
            </button>
        </div>
    );
}
 
export default Todo;