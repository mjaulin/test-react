import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import { Todo } from '../models';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import {
    fetchData,
    addTodo,
    editTodo,
    deleteTodo,
    completeTodo
} from '../actions';

interface AppProps {
    todos: Todo[];
    hasError: false;
    isLoading: true;
    dispatch: Dispatch<{}>;
}

class App extends React.Component<AppProps> {

    componentDidMount() {
        fetchData(this.props.dispatch);
    }

    render() {
        const { todos, hasError, isLoading, dispatch } = this.props;

        if (hasError) {
            return <span>Sorry it doesn't work !!!</span>;
        }

        return (
            <div className="todoapp">
                <Header isLoading={isLoading} addTodo={(text: string) => addTodo(dispatch, text)} />
                <MainSection
                    isLoading={isLoading}
                    todos={todos}
                    editTodo={(t, s) => editTodo(dispatch, t, s)}
                    deleteTodo={(t) => deleteTodo(dispatch, t)}
                    completeTodo={(t, c) => completeTodo(dispatch, t, c)} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    todos: state.todos.todos,
    hasError: state.todos.hasError,
    isLoading: state.todos.isLoading
});

export default connect(mapStateToProps)(App);