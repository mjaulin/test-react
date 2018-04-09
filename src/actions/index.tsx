import { createAction } from 'redux-actions';
import { Todo, ErrorTodo } from '../models';
import API from "../api";
import {
    ADD_TODO,
    FETCH_DELETE_TODO,
    DELETE_TODO,
    FETCH_EDIT_TODO,
    EDIT_TODO,
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

const addTodo =(dispatch, text: string) => {
    let newTodo = { label: text, completed: false };
    API.create(newTodo)
        .then((id: string) => dispatch(addTodoSuccess({ ...newTodo, id: id })))
        .catch((e) => fetchError({...e, payload: newTodo}));
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
        return todo
    }
);

const deleteTodoSuccess = createAction<number, number>(
    DELETE_TODO,
    (id) => id
);

const editTodo = (dispatch, todo, newLabel) => {
    update(dispatch, { ...todo, label: newLabel });
};

const completeTodo = (dispatch, todo, completed) => {
    update(dispatch, { ...todo, completed: completed });
};

const update = function(dispatch: Dispatch<{}>, payload: Todo) {
    API.update(payload)
        .then(() => dispatch(editTodoSuccess(payload)))
        .catch((e) => fetchError({...e, payload: payload}));
};

const editTodoSuccess = createAction<Todo, Todo, string>(
    EDIT_TODO,
    (todo) => todo
);

const fetchDataSuccess = createAction<Todo[], Todo[]>(
    FETCH_DATA_TODO,
    (items: Todo[]) => items
);

const itemsLoaded = createAction<boolean, boolean>(
    ITEM_LOADED_TODO,
    (isLoading: boolean) => !isLoading
);

const fetchError = createAction<ErrorTodo, ErrorTodo>(
    ERROR_TODO,
    (error) => error
);

export {
    fetchData,
    addTodo,
    deleteTodo,
    editTodo,
    completeTodo
}