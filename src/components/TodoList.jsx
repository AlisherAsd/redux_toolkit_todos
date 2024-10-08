import React from 'react';
import TodoItem from './TodoItem';
import { useSelector } from 'react-redux';


const TodoList = () => {

    const todos = useSelector(state => state.todos.todos)
    
    return (
        <ul>
            {
                todos.map(todo => {
                    return (<TodoItem 
                        key={todo.id} 
                        id={todo.id}
                        text={todo.title}
                        completed={todo.completed}
                        {...todos}
                    />)
                })
            }
        </ul>
    );
};

export default TodoList;