import {Action, handleActions} from 'redux-actions';

import {ErrorTodo, IErrorTodo} from '../models';
import { ERROR_TODO } from '../constants';

const initialState: IErrorTodo = {
    errors: []
};

export default handleActions<IErrorTodo, ErrorTodo>({

    [ERROR_TODO]: (state: IErrorTodo, action: Action<ErrorTodo>): IErrorTodo => {
        return { ...state, errors: [ action.payload, ...state.errors ] }
    }

}, initialState);