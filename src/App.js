import React from 'react';
import './App.css';
import { useReducer } from 'react';
import ToDoList from './ToDoList';
import { v4 as uuidv4 } from 'uuid';

const todosInitialState = {
  todos:[]
}

function todosReducer(state, action){
  switch(action.type){
    case 'get':
      return {...state, todos: action.payload}
    case 'add':
      // const newToDo = {id: uuidv4(), text: action.payload}
      const addedToDos = [ ...state.todos, action.payload ]
      return{...state, todos: addedToDos}
    case 'delete':
      const filteredTodoState = state.todos.filter( todo => todo.id !== action.payload.id)
      return {...state, todos:filteredTodoState}
    case 'edit':
      const updatedToDo = {...action.payload}
      const updatedToDoIndex = state.todos.findIndex( todo => todo.id === action.payload.id)
      const updatedToDos = [
        ...state.todos.slice(0, updatedToDoIndex),
        updatedToDo,
        ...state.todos.slice(updatedToDoIndex + 1)
      ];
      return {...state, todos:updatedToDos}
    default:
      return todosInitialState
  }
}

export const TodosContext = React.createContext()

function App() {
  const [state, dispatch] = useReducer(todosReducer, todosInitialState)
  // const value = useContext(UserContext)
  return (
    <TodosContext.Provider value={{state,dispatch}}>
      <ToDoList/>
    </TodosContext.Provider>
  );
}

export default App;
