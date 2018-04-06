import {Action, handleActions} from 'redux-actions';

import {IState, Todo} from '../models';
import {
    FETCH_ADD_TODO, ADD_TODO, EDIT_TODO, FETCH_DATA_TODO, ITEM_LOADED_TODO, ITEM_ERROR_TODO,
    DELETE_TODO
} from '../constants';

const initialState: IState = {
    todos: [],
    isLoading: true,
    hasError: false
};

export default handleActions<IState, Todo>({
    [FETCH_ADD_TODO]: (state: IState, action: Action<Todo>): IState => {
        return { ...state, todos: [{ ...action.payload, isLoading: true }, ...state.todos] }
    },

    [ADD_TODO]: (state: IState, action: Action<Todo>): IState => {
        return { ...state,  todos: [action.payload, ...state.todos] }
    },

    [DELETE_TODO]: (state: IState, action: Action<number>): IState => {
        return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
    },

    [EDIT_TODO]: (state: IState, action: Action<Todo>): IState => {
        return { ...state, todos: state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo) };
    },

    [FETCH_DATA_TODO]: (state: IState, action: Action<Todo[]>): IState => {
        return { ...state, todos: action.payload };
    },

    [ITEM_LOADED_TODO]: (state: IState, action: Action<boolean>): IState => {
        return { ...state, isLoading: action.payload }
    },

    [ITEM_ERROR_TODO]: (state: IState, action: Action<boolean>): IState => {
        return { ...state, hasError: action.payload }
    }
}, initialState);