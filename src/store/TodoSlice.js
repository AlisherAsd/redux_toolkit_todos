import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',

    async function(_, {rejectWithValue}) {

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')

            if (!response.ok) {
                throw new Error
            }
    
            const data = await response.json()
            return data

        } catch(err) {
            return rejectWithValue(err.message)
        }

    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function(id, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,
                {method: 'DELETE'})

            if (!response.ok) {
                throw new Error('Cant delete task. Server error')
            }

            dispatch(removeTodo({id: id}))

        } catch(err) {
            return rejectWithValue(err.message)
        }
    }
)

export const toggleStatus = createAsyncThunk(
    'todos/toggleStatus', 
    async function(id, {rejectWithValue, dispatch, getState}) {

        const todo = getState().todos.todos.find(todo => todo.id === id)
        try {

            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({
                    completed: !todo.completed
                })
            })
            if (!response.ok) {
                throw new Error('Cant toggle status. Server error')
            }

            dispatch(toggleTodoComplete({id: id}))

        } catch(err) {
            return rejectWithValue(err.message)
        }
    }
)

export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async function (text, {rejectWithValue, dispatch}) {
        try {
            const todo = {
                title: text,
                userId: 1,
                completed: false
            }
            const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(todo)
            }) 

            if (!response.ok) {
                throw new Error('Cant post status. Server error')
            }

            const data = await response.json()  
            const id = data.id

            dispatch(addTodo(data))

        } catch(err) {
            return rejectWithValue(err.message)
        }
    }
)

const setError = (state, action) => {
    state.status = 'rejected'
    state.error = action.payload
}


const TodoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null,
    },
    reducers: {
        addTodo(state, action) {
            
            state.todos.push(action.payload)
        },
        toggleTodoComplete(state, action) {
            state.todos.map(todo => {
                if (todo.id !== action.payload.id) return todo;
                
                const todoCompleted = !todo.completed;
                todo.completed = todoCompleted

                return todo
            })
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.status = 'resolve'
            state.todos = action.payload
        })
        builder.addCase(fetchTodos.rejected, (state, action) => setError(state, action))
        builder.addCase(deleteTodo.rejected, (state, action) => setError(state, action))
        builder.addCase(toggleStatus.rejected, (state, action) => setError(state, action))
    }
})


const {addTodo, removeTodo, toggleTodoComplete} = TodoSlice.actions

export default TodoSlice.reducer