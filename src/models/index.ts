export type Todo = {
    id?: string;
    label: string;
    completed: boolean;
    isLoading?: boolean;
};

export type IState = {
    todos : Todo[],
    isLoading: boolean
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

export class ErrorTodo extends Error {

    id: string
    payload: Todo;
    type: ErrorType;

    constructor(id, type, message, payload?) {
        super(message);
        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, ErrorTodo);
        }
        this.id = id;
        this.payload = payload;
        this.type = type;
    }

}
