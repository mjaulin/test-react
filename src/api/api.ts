import { Todo, ErrorTodo, ErrorType } from '../models';

// Real API
const URL = 'http://localhost:8080/';

export class API {

    public static getAll(): Promise<Todo> {
        return fetch(URL)
            .then(response => {
                if (!response.ok) {
                    throw new ErrorTodo(ErrorType.LOADED, "Error while get all tasks");
                }
                return response;
            })
            .then(response => response.json())
    }

    public static create(payload: Todo): Promise<string> {
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
                    throw new ErrorTodo(ErrorType.CREATE,"Error while create new task " + payload.label, payload);
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
                    throw new ErrorTodo(ErrorType.UPDATE, "Error while update task " + payload.label, payload);
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
                throw new ErrorTodo(ErrorType.DELETE, "Error while delete task " + payload.label, payload);
            }
        })
    }
}