import { Todo } from '../models';

// Real API
const URL = 'http://localhost:8080/';
export const API = {
    getAll: () => fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw Error("Error");
            }
            return response;
        })
        .then(response => response.json()),
    create: (payload: Todo) => fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.headers)
        .then(headers => headers["location"]),
    update: (payload: Todo) => fetch(URL + payload.id,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }),
    delete: (id: string) => fetch(URL + id,
        {
            method: 'DELETE'
        })
};