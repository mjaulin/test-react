import {Action, handleActions} from 'redux-actions';

import {ErrorTodo, IState, Todo} from '../models';
import {
    FETCH_DATA_TODO, ADD_TODO, UPDATE_TODO, DELETE_TODO, ITEMS_LOADING_TODO, ITEM_LOADING_TODO, ERROR_TODO
} from '../constants';

const initialState: IState = {
    todos: [],
    isLoading: true
};

export default handleActions<IState, Todo>({
    [FETCH_DATA_TODO]: (state: IState, action: Action<Todo[]>): IState => {
        return { ...state, todos: action.payload };
    },

    [ADD_TODO]: (state: IState, action: Action<Todo>): IState => {
        return { ...state,  todos: [action.payload, ...state.todos] }
    },

    [DELETE_TODO]: (state: IState, action: Action<number>): IState => {
        return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
    },

    [UPDATE_TODO]: (state: IState, action: Action<Todo>): IState => {
        return { ...state, todos: state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo) };
    },

    [ITEMS_LOADING_TODO]: (state: IState, action: Action<boolean>): IState => {
        return { ...state, isLoading: action.payload }
    },

    [ITEM_LOADING_TODO]: (state: IState, action: Action<Todo>): IState => {
        return { ...state, todos: state.todos.map(todo => todo.id == action.payload.id ? action.payload : todo)}
    },

    [ERROR_TODO]: (state: IState, action: Action<ErrorTodo>): IState => {
        return { ...state, todos: state.todos.map(todo => todo.id === action.payload.payload.id ? action.payload.payload : todo) };
    }
}, initialState);