import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import { Todo } from '../models';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import {
    addTodo,
    editTodo,
    completeTodo,
    deleteTodo,
    fetchData
} from '../actions';

interface AppProps {
    todos: Todo[];
    hasError: false;
    isLoading: true;
    dispatch: Dispatch<{}>;
}

class App extends React.Component<AppProps> {

    componentDidMount() {
        this.props.dispatch(fetchData(this.props.dispatch));
    }

    render() {
        const { todos, hasError, isLoading, dispatch } = this.props;

        if (hasError) {
            return <span>Sorry it doesn't work !!!</span>;
        }

        if (isLoading) {
            return <span>Loading...</span>;
        }

        return (
            <div className="todoapp">
                <Header addTodo={(text: string) => dispatch(addTodo(dispatch, text))} />
                <MainSection
                    todos={todos}
                    editTodo={(t, s) => dispatch(editTodo(t, s))}
                    deleteTodo={(t) => dispatch(deleteTodo(dispatch, t))}
                    completeTodo={(t) => dispatch(completeTodo(t))} />
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