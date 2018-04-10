import { Todo, ErrorType } from '../../models';
import { v4 as uuid } from 'uuid';

// Mock API
const todosResponse: Todo[] = require('./todos.json');

type IResponseMock = {
    ok: boolean;
}

export class API {

    public static getAll(): Promise<Todo[]> {
        return new Promise<IResponseMock>(resolve => setTimeout(() => resolve({ ok: true }), 1000))
            .then(response => {
                if (!response.ok) {
                    throw { id: uuid(), type: ErrorType.LOADED, message: "Error while get all tasks" };
                }
                return todosResponse;
            });
    }

    public static create(payload: Todo): Promise<Todo> {
        return new Promise<IResponseMock>(resolve => setTimeout(() => resolve({ ok: true }), 1000))
            .then(response => {
                if (!response.ok) {
                    throw { id: uuid(), type: ErrorType.CREATE, message: "Error while create new task " + payload.label };
                }
                return { ...payload, id: uuid };
            });
    }

    public static update(payload: Todo): Promise<Todo> {
        return new Promise<IResponseMock>(resolve => setTimeout(() => resolve({ ok: true }), 1000))
            .then(response => {
                if (!response.ok) {
                    throw { id: uuid(), type: ErrorType.UPDATE, message: "Error while update task " + payload.label };
                }
                return payload;
            });
    }

    public static delete(payload: Todo): Promise<void> {
        return new Promise<IResponseMock>(resolve => setTimeout(() => resolve({ ok: true }), 1000))
            .then(response => {
                if (!response.ok) {
                    throw { id: uuid(), type: ErrorType.DELETE, message: "Error while delete task " + payload.label };
                }
            });
    }
}