import * as React from 'react';
import * as classNames from 'classnames';

import { Todo } from '../models';
import TodoTextInput from './TodoTextInput';

interface TodoItemProps {
    todo: Todo;
    editTodo: (todo: Todo, text: string) => void;
    deleteTodo: (todo: Todo) => void;
    completeTodo: (todo: Todo, t: boolean) => void;
    key?: any;
}
interface TodoItemState {
    editing: boolean;
}

class TodoItem extends React.Component<TodoItemProps, TodoItemState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editing: false
        };
    }

    handleEdit() {
        this.setState({ editing: true });
    }

    handleComplete(todo) {
        this.props.completeTodo(todo, !todo.completed)
    }

    handleSave(todo: Todo, text: string) {
        if (text.length === 0) {
            this.props.deleteTodo(todo);
        } else {
            this.props.editTodo(todo, text);
        }
        this.setState({ editing: false });
    }

    render() {

        let element;
        if (this.props.todo.isLoading) {
            element = (
                <div>
                    <div className="item">
                        <label>{this.props.todo.label}</label>
                    </div>
                </div>
            );
        } else if (this.state.editing) {
            element = (
                <div>
                    <div className="item">
                        <TodoTextInput text={this.props.todo.label}
                                       editing={this.state.editing}
                                       onSave={(text) => this.handleSave(this.props.todo, text)}/>
                    </div>
                </div>
            );
        } else {
            element = (
                <div>
                    <span className="icon" onClick={() => this.handleComplete(this.props.todo)} />
                    <div className="item" onClick={this.handleEdit.bind(this)}>
                        <label>{this.props.todo.label}</label>
                    </div>
                    <span className="destroy" onClick={() => this.props.deleteTodo(this.props.todo)}>×</span>
                </div>
            );
        }

        return (
            <li className={classNames({
                loading: this.props.todo.isLoading,
                checked: this.props.todo.completed,
                editing: this.state.editing
            })}>
                {element}
            </li>
        );
    }
}

export default TodoItem;