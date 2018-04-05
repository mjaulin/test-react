export type Todo = {
    id?: number;
    label: string;
    completed: boolean;
};

export type IState = {
    todos : Todo[],
    isLoading: boolean,
    hasError: boolean
};