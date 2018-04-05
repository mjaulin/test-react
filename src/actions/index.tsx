import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import { Todo } from '../models';
import {API} from "../api";
import {
    ADD_TODO,
    ADD_TODO_SUCCESS,
    DELETE_TODO,
    DELETE_TODO_SUCCESS,
    EDIT_TODO,
    COMPLETE_TODO,
    FETCH_DATA_TODO,
    FETCH_DATA_SUCCESS_TODO,
    ITEM_LOADED_TODO,
    ITEM_ERROR_TODO
} from '../constants';

const addTodo = createAction<void, Dispatch<{}>, string>(
    ADD_TODO,
    (dispatch, text: string) => {
        let todo: Todo = { label: text, completed: false };
        API.create(todo)
            .then((id: number) => {
                todo.id = id;
                dispatch(addTodoSuccess(todo))
            });
    }
);

const addTodoSuccess = createAction<Todo, Todo>(
    ADD_TODO_SUCCESS,
    (todo: Todo) => todo
);

const deleteTodo = createAction<void, Dispatch<{}>, Todo>(
    DELETE_TODO,
    (dispatch, todo) => API.delete(todo.id).then(() => dispatch(deleteTodoSuccess(todo.id)))
);

const deleteTodoSuccess = createAction<number, number>(
    DELETE_TODO_SUCCESS,
    (id) => id
);

const editTodo = createAction<Todo, Todo, string>(
    EDIT_TODO,
    (todo, newLabel) => ({ ...todo, text: newLabel })
);

const completeTodo = createAction<Todo, Todo>(
    COMPLETE_TODO,
    (todo: Todo) => todo
);

const fetchData = createAction<void, Dispatch<{}>>(
    FETCH_DATA_TODO,
    (dispatch) => {
        dispatch(itemsLoaded(false));
        API.getAll()
            .then(items => dispatch(fetchDataSuccess(items)))
            .then(() => dispatch(itemsLoaded(true)))
            .catch(() => dispatch(itemsHasError(true)))
    }
);

const fetchDataSuccess = createAction<Todo[], Todo[]>(
    FETCH_DATA_SUCCESS_TODO,
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
    addTodo,
    deleteTodo,
    editTodo,
    completeTodo,
    fetchData
}