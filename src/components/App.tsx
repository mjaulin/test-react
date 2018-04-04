import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import { Todo } from '../models/todo';
import Header from './Header';
import MainSection from './MainSection';
import {
    addTodo,
    editTodo,
    completeTodo,
    deleteTodo
} from '../actions/todo';

interface AppProps {
    todos: Todo[];
    dispatch: Dispatch<{}>;
}

class App extends React.Component<AppProps> {
    render() {
        const { todos, dispatch } = this.props;

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
    todos: state.todos
});

export default connect(mapStateToProps)(App);