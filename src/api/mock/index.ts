import { Todo, ErrorTodo, ErrorType } from '../../models';
import { v4 as uuid } from 'uuid';

// Mock API
const todosResponse: Todo[] = require('./todos.json');
export const API = {
    getAll: () => resolveWithDelay(todosResponse),
    create: (payload: Todo) => resolveWithDelay({ ...payload, id: uuid()}, new ErrorTodo(uuid(), ErrorType.CREATE, "Error while create new item " + payload.label)),
    update: (payload: Todo) => resolveWithDelay(payload, new ErrorTodo(uuid(), ErrorType.UPDATE, "Error while update item " + payload.label)),
    delete: (payload: Todo) => resolveWithDelayWithoutValue(new ErrorTodo(uuid(), ErrorType.DELETE, "Error while delete item " + payload.label))
};

type IResponseMock = {
    ok: boolean;
}

function resolveWithDelay<T>(value: T, error?: ErrorTodo, time: number = 1000) : Promise<T>{
    return new Promise<IResponseMock>((resolve) => setTimeout(() => resolve({ ok: error === undefined}), time))
        .then(response => {
            if (!response.ok) {
                throw error;
            }
            return value;
        })
};

function resolveWithDelayWithoutValue(error?: ErrorTodo, time: number = 1000) : Promise<void>{
    return new Promise<IResponseMock>((resolve) => setTimeout(() => resolve({ ok: error === undefined}), time))
        .then(response => {
            if (!response.ok) {
                throw error;
            }
        })
        .catch(error => {
            console.log(error);
            throw error;
        })
};