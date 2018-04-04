import { handleActions, Action } from 'redux-actions';

import { Todo, IState } from '../models/todo';
import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO
} from '../constants/todo';

const initialState: IState = [{
    label: 'Use Redux with TypeScript',
    completed: false,
    id: 0
  }];

export default handleActions<IState, Todo>({
  [ADD_TODO]: (state: IState, action: Action<Todo>): IState => {
    return [{
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      label: action.payload.text,
      completed: action.payload.completed,
    }, ...state];
  },

  [DELETE_TODO]: (state: IState, action: Action<Todo>): IState => {
    return state.filter(todo =>
      todo.id !== action.payload.id
    );
  },

  [EDIT_TODO]: (state: IState, action: Action<Todo>): IState => {
    return state.map(todo =>
      todo.id === action.payload.id ? { ...todo, label: action.payload.text } : todo
    );
  },

  [COMPLETE_TODO]: (state: IState, action: Action<Todo>): IState => {
    return state.map(todo =>
      todo.id === action.payload.id ?
        { ...todo, completed: !todo.completed } :
        todo
    );
  }
}, initialState);