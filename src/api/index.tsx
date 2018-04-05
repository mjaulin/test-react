import { Todo } from '../models';

// Mock API
const todosResponse: Todo[] = require('./mock/todos.json');
export const API = {
    getAll: () => new Promise(resolve => resolve(todosResponse)),
    create: (payload: Todo) => new Promise(resolve => resolve(Math.floor(Math.random() * 100))),
    update: (payload: Todo) => new Promise(resolve => resolve()),
    delete: (id: number) => new Promise(resolve => resolve())
};

// Real API
// const URL = '/todos';
// export const Todos = {
//   getAll: (pageNumber?: number) =>
//     requests.get(`${URL}?${rangeQueryString(pageSize, pageNumber)}`),
//   get: (id: string) =>
//     requests.get(`${URL}/${id}`),
//   create: (payload: ITodoModel) =>
//     requests.post(`${URL}`, { payload }),
//   update: (payload: ITodoModel) =>
//     requests.put(`${URL}/${payload.id}`, { todo: removeKeys(payload, ['id']) }),
//   delete: (id: string) =>
//     requests.delete(`${URL}/${id}`),
// };