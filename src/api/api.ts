import { Todo, ErrorType } from '../models';
import { v4 as uuid } from 'uuid';

// Real API
const URL = process.env.API_URL;

export class API {

    public static getAll(): Promise<Todo[]> {
        return fetch(URL)
            .then(response => {
                if (!response.ok) {
                    throw { id: uuid(), type: ErrorType.LOADED, message: "Error while get all tasks" };
                }
                return response;
            })
            .then(response => response.json())
    }

    public static create(payload: Todo): Promise<Todo> {
        return fetch(URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (!response.ok) {
                    throw { id: uuid(), type: ErrorType.CREATE, message: "Error while create new task " + payload.label };
                }
                return response;
            })
            .then(response => response.json())
    }

    public static update(payload: Todo): Promise<Todo> {
        return fetch(URL + payload.id,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (!response.ok) {
                    throw { id: uuid(), type: ErrorType.UPDATE, message: "Error while update task " + payload.label };
                }
                return response;
            })
            .then(response => response.json())
    }

    public static delete(payload: Todo): Promise<void> {
        return fetch(URL + payload.id,
            {
                method: 'DELETE'
            }).then(response => {
            if (!response.ok) {
                throw { id: uuid(), type: ErrorType.DELETE, message: "Error while delete task " + payload.label };
            }
        })
    }
}