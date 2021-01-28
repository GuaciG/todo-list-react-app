import React from 'react';
import './TodoList.css';
import Todo from './Todo';

const TodoList = (props) => { //it receives todos, deleteTodo, completeTodo, editRow, filteredTodos as props. 

    //console.log(props.todos);
    
    return ( 
        <div className="todo-container">
            
                { 
                    // {} to write javascript inside jsx

                    //if length of todos is > 0 
                    props.todos.length > 0 ? 
                        // print a list 
                        <ul className="todo-list">
                            {  
                                // javascript inside jsx
                                // loop over all filteredTodos and for each todo make a Todo component. 
                                props.filteredTodos.map(todo => (
                                    <Todo
                                        key={todo.id}
                                        todo={todo} 
                                        deleteTodo={props.deleteTodo}
                                        completeTodo={props.completeTodo}
                                        editRow={props.editRow}
                                    />              
    
                                ))

                            }

                        </ul>

                     : (
                         //if length of todos is <= 0, show alert-div
                        <div className="alert-div">
                            To create a to-Do list, please enter your first task in the field above and click "ADD" button. 
                        </div>
                    )
                }
                        
        </div>
    );
}
 
export default TodoList;

