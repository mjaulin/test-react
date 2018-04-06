import { createAction } from 'redux-actions';
import { Todo } from '../models';
import {API} from "../api";
import {
    ADD_TODO,
    DELETE_TODO,
    FETCH_DATA_TODO,
    ITEM_LOADED_TODO,
    ITEM_ERROR_TODO, EDIT_TODO
} from '../constants';

const fetchData = (dispatch) => {
    dispatch(itemsLoaded(false));
    API.getAll()
        .then(items => dispatch(fetchDataSuccess(items)))
        .then(() => dispatch(itemsLoaded(true)))
        .catch(() => dispatch(itemsHasError(true)))
};

const addTodo = (dispatch, text: string) => {
    let newTodo = { label: text, completed: false };
    API.create(newTodo)
        .then((id: number) => dispatch(addTodoSuccess({ ...newTodo, id: id })));
};

const addTodoSuccess = createAction<Todo, Todo>(
    ADD_TODO,
    (todo: Todo) => todo
);

const deleteTodo = (dispatch, todo) => API.delete(todo.id).then(() => dispatch(deleteTodoSuccess(todo.id)));

const deleteTodoSuccess = createAction<number, number>(
    DELETE_TODO,
    (id) => id
);

const editTodo = (dispatch, todo, newLabel) => {
    let updatedTodo = { ...todo, text: newLabel };
    API.update(updatedTodo).then(() => dispatch(editTodoSuccess(updatedTodo)))
};

const completeTodo = (dispatch, todo, completed) => {
    let updatedTodo = { ...todo, completed: completed };
    API.update(updatedTodo).then(() => dispatch(editTodoSuccess(updatedTodo)))
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

const itemsHasError = createAction<boolean>(
    ITEM_ERROR_TODO,
    () => true
);

export {
    fetchData,
    addTodo,
    deleteTodo,
    editTodo,
    completeTodo
}