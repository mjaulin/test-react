import { Todo } from '../models';
import API from "../api";
import {
    fetchDataSuccess,
    addSuccess,
    fetchUpdateSuccess,
    updateSuccess,
    fetchDeleteSuccess,
    deleteSuccess,
    fetchLoading,
    fetchError
} from "../actions";

const fetchLoadData = () => (dispatch) => {
    dispatch(fetchLoading(false));
    API.getAll()
        .then(items => dispatch(fetchDataSuccess(items)))
        .then(() => dispatch(fetchLoading(true)))
        .catch((e) => fetchError(e));
};

const fetchAdd = (text: string) => (dispatch) => {
    let newTodo = { label: text, completed: false };
    API.create(newTodo)
        .then((payload: Todo) => dispatch(addSuccess(payload)))
        .catch((e) => dispatch(fetchError(e, newTodo)));
};

const fetchUpdate = (todo: Todo, updatedTodo: Todo) => (dispatch) => {
    API.update(updatedTodo)
        .then(() => dispatch(updateSuccess(updatedTodo)))
        .catch((e) => dispatch(fetchError(e, todo)));
    dispatch(fetchUpdateSuccess(updatedTodo));
};

const fetchDelete = (todo: Todo) => (dispatch) => {
    API.delete(todo).then(() => dispatch(deleteSuccess(todo.id)));
    dispatch(fetchDeleteSuccess(todo))
};

export {
    fetchLoadData,
    fetchAdd,
    fetchUpdate,
    fetchDelete
}