import { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import InputField from './components/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTodo, fetchTodos } from './store/TodoSlice';

function App() {
  
  const [text, setText] = useState('')
  const {status, error} = useSelector(state => state.todos)
  const dispatch = useDispatch()

  const addTask = () => {
    dispatch(addNewTodo(text))
    setText('')
  }


  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  return (
    <div className='App'>
      
      <InputField addTodo={addTask} text={text} setText={setText}/>

      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>Error: {error}</h2>}

      <TodoList />
    </div>
  );
}

export default App;
