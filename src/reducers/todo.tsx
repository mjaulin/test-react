import {Action, handleActions} from 'redux-actions';

import {IState, Todo} from '../models';
import {ADD_TODO, COMPLETE_TODO, DELETE_TODO, EDIT_TODO, FETCH_DATA_SUCCESS_TODO} from '../constants';

const initialState: IState = {
    todos: [],
    isLoading: true,
    hasError: false
};

export default handleActions<IState, Todo>({
    [ADD_TODO]: (state: IState, action: Action<Todo>): IState => {
        return { ...state,
            todos: [{
                id: state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                label: action.payload.text
            }, ...state.todos]
        }
    },

    [DELETE_TODO]: (state: IState, action: Action<Todo>): IState => {
        return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload.id) };
    },

    [EDIT_TODO]: (state: IState, action: Action<Todo>): IState => {
        return { ...state, 
            todos: state.todos.map(todo => todo.id === action.payload.id ? { ...todo, label: action.payload.text} : todo) 
        }
    },

    [FETCH_DATA_SUCCESS_TODO]: (state: IState, action: Action<Todo[]>): IState => {
        return { ...state, todos: action.payload };
    }
}, initialState);