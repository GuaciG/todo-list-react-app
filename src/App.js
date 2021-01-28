import React, { useState, useEffect } from 'react';
import './App.css';
import EditTodoForm from './components/EditTodoForm';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import Today from './components/Today';
import Footer from './components/Footer';
import { v4 as uuidv4 } from 'uuid'; //library to generate aleatory id's


function App() {

  
  //todosData = empty array where we store different objects with their properties for initial state.
  const todosData = [
    //{id: uuidv4(), description: 'Go shopping', completed: false}
  ];
   
  const [todos, setTodos] = useState(todosData);

  
  //==================================================================
  //useEffect
  //===================================================================

  //RUN ONCE WHEN THE APP START because it doesn't have dependencies at the end ,[]); 
  //This function stores todos in localStorage:
  useEffect(() => {
    const getLocalTodos = () => {
      //if localStorage is empty, 
      if (localStorage.getItem('todos') === null) {
        //localStorage stores 'todos' as a string using the JSON.stringify() method
        localStorage.setItem('todos', JSON.stringify([]));
      }
      else {  //if localStorage has already 'todos', 
        //convert strings 'todos' to objects 'todos' using the JSON.parse() method 
        let todoLocal = JSON.parse(localStorage.getItem("todos"));
        //and setTodos
        setTodos(todoLocal);
      }
    }
    getLocalTodos();
  }, []);



  //setStatus todos: ****************************************************
  //Use useEffect to filter 'todos' with <select> element depending on the status(options):
  //status can be 'complete', 'uncomplete' or 'all'
  const [status, setStatus] = useState('all');
  //We need a empty array where store the filtered 'todos'
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    //depending on the status, show me a TodoList. filteredTodos will be sent to TodoList component. 
    const filterHandler = () => {
      switch(status) {
        case 'completed':
          setFilteredTodos(todos.filter((todo) => todo.completed === true));
          break;
        case 'uncompleted':
          setFilteredTodos(todos.filter((todo) => todo.completed === false));
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    };

    //Save to local
    const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
    };

    filterHandler();
    saveLocalTodos();
  }, [todos, status]);
  
 
  //==================================================================
  //Functions  
  //==================================================================

  //Add todos: ****************************************************
  //We receive the information through the input = description "go shopping"
  //we add the todo.id and todo.completed properties and we put it inside todos array
  const addTodo = (todo) => {
    todo.id = uuidv4();
    todo.completed = false;
    setTodos([
      todo,
      ...todos,
    ])
  }
  

  //Remove todos: ************************************************
  //we send an id and we put the 'todo' out which match with the sent id
  const deleteTodo = (id) => {   
    setTodos(todos.filter(todo => todo.id !== id));
  }


  //Edit todos: **************************************************
  //In order to switch between AddTodoForm and EditTodoForm components in the state, 
  //we need a 'editing' variable with a boolean in false and setEditing to change them. 
  const [editing, setEditing] = useState(false);
  //Also we need an currentTodo object variable without values which receives the todo's info to edit 
  const [currentTodo, setCurrentTodo] = useState({
    id: null, description: '', completed: null
  })

  //when we click the pencil-icon button on any todo,
  const editRow = (todo) => {
    //the EditTodoForm component is showed
    setEditing(true);
    // and the clicked todo's info is stored in the currentTodo variable
    setCurrentTodo({
      id: todo.id, description: todo.description, completed: todo.completed, 
    })
  }

  //when we click EDIT button the updateTodo is trigged. We send an id and an updatedTodo as parameters. 
  const updateTodo = (id, updatedTodo) => {
    //console.log(updatedTodo);
    //first, we come back to show the AddTodoForm component. 
    setEditing(false);
    //and then, we loop over all 'todos' and we ask to each one.  
    //if id(parameter) === todo.id, set the updated'todo' if not, set the todo. 
    setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo))
  }


  //Complete todos: **************************************************
  //when we click the checked-icon button on any todo,
  const completeTodo = (todo) => {
    //we loop over all 'todos' and we ask to each one.
    // if item.id === todo.id(parameter)   
    setTodos(todos.map(item => {
      if (item.id === todo.id) {
        //return the same item but change the completed property to the opposite. 
          return {
              ...item, completed: !item.completed
          }
      } // and return it.
      return item;
    }));
  }

  

  return (
    <div className="App">
      <header>Make your To-Do List</header>
      <div className="container">
        <Today />
        { //we use {} to write javascript inside jsx
          //if editing is true, show me <EditTodoForm />, if not, show me <AddTodoForm />  
          editing ? (
            <EditTodoForm 
              currentTodo={currentTodo}
              updateTodo={updateTodo}
            />

          ) : (
            <AddTodoForm 
              addTodo={addTodo}
              setStatus={setStatus}
            />

          )
        }
        <TodoList 
          todos={todos}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
          editRow={editRow}
          filteredTodos={filteredTodos}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;


