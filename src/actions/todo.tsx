import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import { Todo, IState } from '../models/todo';

import {
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
    COMPLETE_TODO,
    FETCH_DATA_TODO,
    FETCH_DATA_SUCCESS_TODO,
    ITEM_LOADED_TODO,
    ITEM_ERROR_TODO
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

const fetchData = createAction<Dispatch<{}>, string, Todo>(
    FETCH_DATA_TODO,
    (dispatch, url) => {
        dispatch(itemsIsLoading(true));

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then(response => response.json())
            .then(items => dispatch(fetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasErrored(true)))
    }
);

const fetchDataSuccess = createAction<Todo[], Todo[]>(
    FETCH_DATA_SUCCESS_TODO,
    (items: Todo[]) => items
);

const itemsIsLoading = createAction<boolean, boolean>(
    ITEM_LOADED_TODO,
    (isLoading: boolean) => !isLoading
);

const itemsHasErrored = createAction<boolean>(
    ITEM_ERROR_TODO,
    () => true
);

export {
    addTodo,
    deleteTodo,
    editTodo,
    completeTodo,
    fetchData,
    fetchDataSuccess
}