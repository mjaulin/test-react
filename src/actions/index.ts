import { createAction } from 'redux-actions';
import { Todo, ErrorTodo } from '../models';

import {
    FETCH_DATA_TODO,
    ADD_TODO,
    UPDATE_TODO,
    DELETE_TODO,
    ITEMS_LOADING_TODO,
    ITEM_LOADING_TODO,
    ERROR_TODO,
    DELETE_ERROR_TODO
} from '../constants';

const fetchDataSuccess = createAction<Todo[], Todo[]>(
    FETCH_DATA_TODO,
    (items: Todo[]) => items
);

const addSuccess = createAction<Todo, Todo>(
    ADD_TODO,
    (todo: Todo) => todo
);

const updateSuccess = createAction<Todo, Todo>(
    UPDATE_TODO,
    (todo) => todo
);

const deleteSuccess = createAction<number, number>(
    DELETE_TODO,
    (id) => id
);

const fetchItemsLoading = createAction<boolean, boolean>(
    ITEMS_LOADING_TODO,
    (isLoading: boolean) => isLoading
);

const fetchItemLoading = createAction<Todo, Todo, boolean>(
    ITEM_LOADING_TODO,
    (todo: Todo, isLoading: boolean) => ({ ...todo, isLoading: isLoading })
);

const fetchError = createAction<ErrorTodo, ErrorTodo>(
    ERROR_TODO,
    (error: ErrorTodo) => error
);

const fetchDeleteError = createAction<ErrorTodo, ErrorTodo>(
    DELETE_ERROR_TODO,
    (error: ErrorTodo) => error
);

export {
    fetchDataSuccess,
    addSuccess,
    updateSuccess,
    deleteSuccess,
    fetchItemsLoading,
    fetchItemLoading,
    fetchError,
    fetchDeleteError
}