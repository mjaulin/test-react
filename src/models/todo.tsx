export type Todo = {
    id?: number;
    label: string;
  };
  
export type IState = {
    todos : Todo[],
    isLoading: boolean,
    hasError: boolean
};