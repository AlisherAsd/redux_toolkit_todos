import React from 'react';

const InputField = ({addTodo, text, setText}) => {
    return (
        <label>
            <input 
            value={text} placeholder='Введите задачу'
            onChange={e => setText(e.target.value)}
            />
            <button onClick={addTodo}>Add todo</button>
        </label>
    );
};

export default InputField;