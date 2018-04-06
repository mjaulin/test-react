export type Todo = {
    id?: number;
    label: string;
    completed: boolean;
    isLoading?: boolean;
};

export type IState = {
    todos : Todo[],
    isLoading: boolean,
    hasError: boolean
};