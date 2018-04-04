import { createAction } from 'redux-actions';

import { Todo } from '../models/todo';

import {
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
    COMPLETE_TODO
} from '../constants/todo';

const addTodo = createAction<Todo, string>(
    ADD_TODO,
    (text: string) => ({ text, completed: false })
);

const deleteTodo = createAction<Todo, Todo>(
    DELETE_TODO,
    (todo: Todo) => todo
);

const editTodo = createAction<Todo, Todo, string>(
    EDIT_TODO,
    (todo: Todo, newLabel: string) => ({ ...todo, text: newLabel })
);

const completeTodo = createAction<Todo, Todo>(
    COMPLETE_TODO,
    (todo: Todo) => todo
);

export {
    addTodo,
    deleteTodo,
    editTodo,
    completeTodo
}