import { Todo } from '../../models';

// Mock API
const todosResponse: Todo[] = require('./mock/todos.json');
export const API = {
    getAll: () => new Promise(resolve => resolve(todosResponse)),
    create: () => new Promise(resolve => resolve(Math.floor(Math.random() * 100))),
    update: () => new Promise(resolve => resolve()),
    delete: () => new Promise(resolve => resolve())
};