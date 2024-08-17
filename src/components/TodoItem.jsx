import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleStatus, deleteTodo } from '../store/TodoSlice';


const TodoItem = ({id, text, completed}) => {

    const dispatch = useDispatch()

    return (
        <li>
            <input type='checkbox' checked={completed} 
            onChange={() => dispatch(toggleStatus(id))}
            />
            <span>№: {id} {text}</span>
            <span className='deleter'
            onClick={() => dispatch(deleteTodo(id))}
            >&times;</span>
        </li>
    )
};

export default TodoItem;