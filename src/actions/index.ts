import { createAction } from 'redux-actions';
import { Todo, ErrorTodo } from '../models';
import API from "../api";
import {
    ADD_TODO,
    FETCH_DELETE_TODO,
    DELETE_TODO,
    FETCH_EDIT_TODO,
    EDIT_TODO,
    FETCH_COMPLETE_TODO,
    FETCH_DATA_TODO,
    ITEM_LOADED_TODO,
    ERROR_TODO
} from '../constants';
import {Dispatch} from "redux";

const fetchData = (dispatch) => {
    dispatch(itemsLoaded(false));
    API.getAll()
        .then(items => dispatch(fetchDataSuccess(items)))
        .then(() => dispatch(itemsLoaded(true)))
        .catch((e) => fetchError(e));
};

const addTodo = (dispatch, text: string) => {
    let newTodo = { label: text, completed: false };
    API.create(newTodo)
        .then((payload: Todo) => dispatch(addTodoSuccess(payload)))
        .catch((e) => dispatch(fetchError(e, newTodo)));
    return newTodo;
};

const addTodoSuccess = createAction<Todo, Todo>(
    ADD_TODO,
    (todo: Todo) => todo
);

const deleteTodo = createAction<Todo, Dispatch<{}>, Todo>(
    FETCH_DELETE_TODO,
    (dispatch, todo) => {
        API.delete(todo).then(() => dispatch(deleteTodoSuccess(todo.id)));
        return { ...todo, isLoading: true };
    }
);

const deleteTodoSuccess = createAction<number, number>(
    DELETE_TODO,
    (id) => id
);

const editTodo = createAction<Todo, Dispatch<{}>, Todo>(
    FETCH_EDIT_TODO,
    (dispatch, todo, newLabel) => update(dispatch, todo, { ...todo, label: newLabel })
);

const completeTodo = createAction<Todo, Dispatch<{}>, Todo, boolean>(
    FETCH_COMPLETE_TODO,
    (dispatch, todo, completed) => update(dispatch, todo, { ...todo, completed: completed })
);

const update = function(dispatch: Dispatch<{}>, todo: Todo, updatedTodo: Todo) : Todo {
    API.update(updatedTodo)
        .then(() => dispatch(editTodoSuccess(updatedTodo)))
        .catch((e) => dispatch(fetchError(e, todo)));
    return { ...updatedTodo };
};

const editTodoSuccess = createAction<Todo, Todo>(
    EDIT_TODO,
    (todo: Todo) => todo
);

const fetchDataSuccess = createAction<Todo[], Todo[]>(
    FETCH_DATA_TODO,
    (items: Todo[]) => items
);

const itemsLoaded = createAction<boolean, boolean>(
    ITEM_LOADED_TODO,
    (isLoading: boolean) => !isLoading
);

const fetchError = createAction<ErrorTodo, ErrorTodo, Todo>(
    ERROR_TODO,
    (error: ErrorTodo, todo: Todo) => ({ ...error, payload: todo })
);

export {
    fetchData,
    addTodo,
    deleteTodo,
    editTodo,
    completeTodo,
    fetchError
}