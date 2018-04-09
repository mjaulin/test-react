import { createAction } from 'redux-actions';
import { Todo, ErrorTodo } from '../models';

import {
    FETCH_DATA_TODO,
    ADD_TODO,
    FETCH_UPDATE_TODO,
    UPDATE_TODO,
    FETCH_DELETE_TODO,
    DELETE_TODO,
    ITEM_LOADED_TODO,
    ERROR_TODO
} from '../constants';

const fetchDataSuccess = createAction<Todo[], Todo[]>(
    FETCH_DATA_TODO,
    (items: Todo[]) => items
);


const addSuccess = createAction<Todo, Todo>(
    ADD_TODO,
    (todo: Todo) => todo
);

const fetchUpdateSuccess = createAction<Todo, Todo>(
    FETCH_UPDATE_TODO,
    (todo) => todo
);

const updateSuccess = createAction<Todo, Todo>(
    UPDATE_TODO,
    (todo) => todo
);

const fetchDeleteSuccess = createAction<Todo, Todo>(
    FETCH_DELETE_TODO,
    (todo: Todo) =>  todo
);

const deleteSuccess = createAction<number, number>(
    DELETE_TODO,
    (id) => id
);

const fetchLoading = createAction<boolean, boolean>(
    ITEM_LOADED_TODO,
    (isLoading: boolean) => !isLoading
);

const fetchError = createAction<ErrorTodo, ErrorTodo, Todo>(
    ERROR_TODO,
    (error: ErrorTodo, todo: Todo) => ({ ...error, payload: todo })
);

export {
    fetchDataSuccess,
    addSuccess,
    fetchUpdateSuccess,
    updateSuccess,
    fetchDeleteSuccess,
    deleteSuccess,
    fetchLoading,
    fetchError
}