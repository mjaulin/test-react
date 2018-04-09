import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import { Todo, ErrorTodo } from '../models';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Errors from '../components/Errors';
import {
    fetchData,
    addTodo,
    editTodo,
    deleteTodo,
    completeTodo
} from '../actions';

interface AppProps {
    todos: Todo[];
    errors: ErrorTodo[];
    isLoading: true;
    dispatch: Dispatch<{}>;
}

class App extends React.Component<AppProps> {

    componentDidMount() {
        fetchData(this.props.dispatch);
    }

    render() {
        const { todos, errors, isLoading, dispatch } = this.props;

        return (
            <div className="todoapp">
                <Header isLoading={isLoading} addTodo={(text: string) => addTodo(dispatch, text)} />
                <MainSection
                    isLoading={isLoading}
                    todos={todos}
                    editTodo={(t, s) => dispatch(editTodo(dispatch, t, s))}
                    deleteTodo={(t) => dispatch(deleteTodo(dispatch, t))}
                    completeTodo={(t, c) => dispatch(completeTodo(dispatch, t, c))} />
                <Errors errors={errors} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    todos: state.todos.todos,
    errors: state.errors.errors,
    isLoading: state.todos.isLoading
});

export default connect(mapStateToProps)(App);