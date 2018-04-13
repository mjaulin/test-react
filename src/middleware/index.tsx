import { Todo } from '../models';
import { API, APIMOCK } from "../api";
import {
    fetchDataSuccess,
    addSuccess,
    updateSuccess,
    deleteSuccess,
    fetchItemsLoading,
    fetchItemLoading,
    fetchError
} from "../actions";

let api = process.env.MOCK ? APIMOCK : API;

const fetchLoadData = () => (dispatch) => {
    dispatch(fetchItemsLoading(true));
    api.getAll()
        .then(items => dispatch(fetchDataSuccess(items)))
        .then(() => dispatch(fetchItemsLoading(false)))
        .catch((e) => dispatch(fetchError(e)));
};

const fetchAdd = (text: string) => (dispatch) => {
    let newTodo = { label: text, completed: false };
    api.create(newTodo)
        .then((payload: Todo) => dispatch(addSuccess(payload)))
        .catch((e) => dispatch(fetchError({ ...e, payload: newTodo })));
};

const fetchUpdate = (todo: Todo, updatedTodo: Todo) => (dispatch) => {
    dispatch(fetchItemLoading(updatedTodo, true));
    api.update(updatedTodo)
        .then(() => dispatch(updateSuccess(updatedTodo)))
        .catch((e) => dispatch(fetchError({ ...e, payload: todo })));
};

const fetchDelete = (todo: Todo) => (dispatch) => {
    dispatch(fetchItemLoading(todo, true));
    api.delete(todo)
        .then(() => dispatch(deleteSuccess(todo.id)))
        .catch((e) => {
            dispatch(fetchError({ ...e, payload: todo }))
        });
};

export {
    fetchLoadData,
    fetchAdd,
    fetchUpdate,
    fetchDelete
}