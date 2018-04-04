import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import { Todo } from '../models/todo';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import {
    addTodo,
    editTodo,
    completeTodo,
    deleteTodo,
    fetchData
} from '../actions/todo';

interface AppProps {
    todos: Todo[];
    hasErrored: false;
    isLoading: true;
    dispatch: Dispatch<{}>;
}

class App extends React.Component<AppProps> {

    componentDidMount() {
        this.props.dispatch(fetchData('http://599167402df2f40011e4929a.mockapi.io/items'));
    }

    render() {
        const { todos, hasErrored, isLoading, dispatch } = this.props;

        if (hasErrored) {
            return <span>Sorry it doesn't work !!!</span>;
        }

        if (isLoading) {
            return <span>Loading...</span>;
        }

        return (
            <div className="todoapp">
                <Header addTodo={(text: string) => dispatch(addTodo(text))} />
                <MainSection
                    todos={todos}
                    editTodo={(t, s) => dispatch(editTodo(t, s))}
                    deleteTodo={(t) => dispatch(deleteTodo(t))}
                    completeTodo={(t) => dispatch(completeTodo(t))} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    todos: state.todos,
    hasErrored: state.hasErrored,
    isLoading: state.isLoading
});

export default connect(mapStateToProps)(App);