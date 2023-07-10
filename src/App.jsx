import { useState } from 'react'

//  Components
import CustomForm from './Components/CustomForm'
import TaskList from './Components/TaskList';
import EditForm from './Components/EditForm';

// Customs Hooks ->Local Storage
import useLocalStorage from './hooks/useLocalStorage';





function App() {
  const [tasks, setTasks] = useLocalStorage('react-todo.tasks', []);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const addTask = (task) => {
    // console.log(task);
    setTasks(prevState => [...prevState, task])
  }

  const deleteTask = (id) =>{
    setTasks(prevState => prevState.filter(t => t.id !== id)); 
  }

  const toggleTask = (id) =>{
    setTasks(prevState => prevState.map(t => (t.id === id ? {...t, checked: !t.checked} : t
      )))
  }

  const updateTask = (task) =>{
    setTasks(prevState => prevState.map(t => (t.id === task.id ? {...t, name: task.name} : t
      )))

      closeEditedMode();

  }

  const closeEditedMode = () =>{
    setIsEditing(false);
    // TODO: prev state focus
    previousFocusEl.focus();
    
  }

  const enterEditMode =(task) => {
    setEditedTask(task);
    setIsEditing(true);
    // TODO: set focus back to original
    setPreviousFocusEl(document.activeElement);
  }

  return (
    <div className='container'>
      <header>
        <h2> My Task List</h2>        
      </header>
      {
        isEditing && (
          <EditForm editedTask={editedTask}
                   updateTask={updateTask}
                   closeEditMode={closeEditedMode}/>
        )
        
      }
      
      <CustomForm addTask={addTask}/>
      {tasks && (
      <TaskList tasks={tasks} 
                deleteTask={deleteTask}
                toggleTask={toggleTask} 
                enterEditMode={enterEditMode}/>
    )}
    </div>
  )
}

export default App
