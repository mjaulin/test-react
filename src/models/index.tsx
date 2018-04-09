export type Todo = {
    id?: string;
    label: string;
    completed: boolean;
    isLoading?: boolean;
};

export enum ErrorType {
    LOADED,
    CREATE,
    UPDATE,
    DELETE
}

export type IState = {
    todos : Todo[],
    isLoading: boolean,
    error?: ErrorTodo
};

export class ErrorTodo extends Error {

    payload: Todo;
    type: ErrorType;

    constructor(type, message, payload?) {
        super(message);
        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, ErrorTodo);
        }
        this.payload = payload;
        this.type = type;
    }

}
