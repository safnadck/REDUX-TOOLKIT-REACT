import { createSlice, nanoid } from "@reduxjs/toolkit";

// Function to load initial state from local storage
const loadStateFromLocalStorage = () => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
};

const initialState = {
    todos: loadStateFromLocalStorage(), 
};

export const TodoSlice = createSlice({
    name: 'todo',
    initialState, 
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
            };
            state.todos.push(todo);
            
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
    },
});

export const { addTodo, removeTodo } = TodoSlice.actions;

export default TodoSlice.reducer;
