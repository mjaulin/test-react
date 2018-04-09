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
    fetchDelete, fetchUpdate
} from '../middleware';

interface AppProps {
    todos: Todo[];
    errors: ErrorTodo[];
    isLoading: true;
    dispatch: Dispatch<{}>;
}

class App extends React.Component<AppProps> {

    componentDidMount() {
        this.props.dispatch(fetchLoadData());
    }

    render() {
        const { todos, errors, isLoading, dispatch } = this.props;

        return (
            <div className="todoapp">
                <Header isLoading={isLoading} addTodo={(text: string) => dispatch(fetchAdd(text))} />
                <MainSection
                    isLoading={isLoading}
                    todos={todos}
                    editTodo={(t, s) => dispatch(fetchUpdate(t, { ...t, label: s }))}
                    deleteTodo={(t) => dispatch(fetchDelete(t))}
                    completeTodo={(t, c) => dispatch(fetchUpdate(t, {...t, completed: c }))} />
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