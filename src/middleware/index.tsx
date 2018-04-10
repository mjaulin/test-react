import { Todo } from '../models';
import API from "../api";
import {
    fetchDataSuccess,
    addSuccess,
    updateSuccess,
    deleteSuccess,
    fetchItemsLoading,
    fetchItemLoading,
    fetchError
} from "../actions";

const fetchLoadData = () => (dispatch) => {
    dispatch(fetchItemsLoading(true));
    API.getAll()
        .then(items => dispatch(fetchDataSuccess(items)))
        .then(() => dispatch(fetchItemsLoading(false)))
        .catch((e) => fetchError(e));
};

const fetchAdd = (text: string) => (dispatch) => {
    let newTodo = { label: text, completed: false };
    API.create(newTodo)
        .then((payload: Todo) => dispatch(addSuccess(payload)))
        .catch((e) => dispatch(fetchError(e, newTodo)));
};

const fetchUpdate = (todo: Todo, updatedTodo: Todo) => (dispatch) => {
    dispatch(fetchItemLoading(updatedTodo, true));
    API.update(updatedTodo)
        .then(() => dispatch(updateSuccess(updatedTodo)))
        .catch((e) => dispatch(fetchError(e, todo)));
};

const fetchDelete = (todo: Todo) => (dispatch) => {
    dispatch(fetchItemLoading(todo, true))
    API.delete(todo)
        .then(() => dispatch(deleteSuccess(todo.id)))
        .catch(e => dispatch(fetchError(e, todo)));
};

export {
    fetchLoadData,
    fetchAdd,
    fetchUpdate,
    fetchDelete
}