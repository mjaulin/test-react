export type Todo = {
    id?: string;
    label: string;
    completed: boolean;
    isLoading?: boolean;
};

export type IState = {
    todos : Todo[],
    isLoading: boolean,
    hasError: boolean
};

export type IErrorTodo = {
    errors?: ErrorTodo[]
};

export enum ErrorType {
    LOADED,
    CREATE,
    UPDATE,
    DELETE
}

export type ErrorTodo = {
    id: string;
    payload: Todo;
    type: ErrorType;
    message: string;
}
