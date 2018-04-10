import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import { Todo, ErrorTodo } from '../models';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Errors from '../components/Errors';
import {
    fetchLoadData,
    fetchAdd,
    fetchDelete, 
    fetchUpdate
} from '../middleware';
import {
    fetchDeleteError
} from '../actions';

interface AppProps {
    todos: Todo[];
    errors: ErrorTodo[];
    isLoading: boolean;
    hasError: boolean;
    dispatch: Dispatch<{}>;
}

class App extends React.Component<AppProps> {

    componentDidMount() {
        this.props.dispatch(fetchLoadData());
    }

    render() {
        const { todos, errors, isLoading, hasError, dispatch } = this.props;

        return (
            <div className="todoapp">
                <Header isLoading={isLoading} addTodo={(text: string) => dispatch(fetchAdd(text))} />
                <MainSection
                    isLoading={isLoading}
                    todos={todos}
                    hasError={hasError}
                    editTodo={(t, s) => dispatch(fetchUpdate(t, { ...t, label: s }))}
                    deleteTodo={(t) => dispatch(fetchDelete(t))}
                    completeTodo={(t, c) => dispatch(fetchUpdate(t, {...t, completed: c }))} />
                <Errors errors={errors} deleteError={(e) => dispatch(fetchDeleteError(e))} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    todos: state.todos.todos,
    hasError: state.todos.hasError,
    errors: state.errors.errors,
    isLoading: state.todos.isLoading
});

export default connect(mapStateToProps)(App);