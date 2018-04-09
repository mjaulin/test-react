import {Action, handleActions} from 'redux-actions';

import {ErrorTodo, IState, Todo} from '../models';
import {
    ADD_TODO, FETCH_UPDATE_TODO, UPDATE_TODO, FETCH_DELETE_TODO, DELETE_TODO, FETCH_DATA_TODO, ITEM_LOADED_TODO, ERROR_TODO
} from '../constants';

const initialState: IState = {
    todos: [],
    isLoading: true
};

export default handleActions<IState, Todo>({
    [ADD_TODO]: (state: IState, action: Action<Todo>): IState => {
        return { ...state,  todos: [action.payload, ...state.todos] }
    },

    [FETCH_DELETE_TODO]: (state: IState, action: Action<Todo>): IState => {
        return { ...state, todos: state.todos.map(todo => todo.id == action.payload.id ? { ...action.payload, isLoading: true } : todo)}
    },

    [DELETE_TODO]: (state: IState, action: Action<number>): IState => {
        return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
    },

    [FETCH_UPDATE_TODO]: (state: IState, action: Action<Todo>): IState => {
        return { ...state, todos: state.todos.map(todo => todo.id == action.payload.id ? { ...todo, label: action.payload.label, isLoading: true } : todo)}
    },

    [UPDATE_TODO]: (state: IState, action: Action<Todo>): IState => {
        return { ...state, todos: state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo) };
    },

    [FETCH_DATA_TODO]: (state: IState, action: Action<Todo[]>): IState => {
        return { ...state, todos: action.payload };
    },

    [ITEM_LOADED_TODO]: (state: IState, action: Action<boolean>): IState => {
        return { ...state, isLoading: action.payload };
    },

    [ERROR_TODO]: (state: IState, action: Action<ErrorTodo>): IState => {
        return { ...state, todos: state.todos.filter(todo => !action.payload.type.DELETE || todo.id !== action.payload.id) };
    }
}, initialState);