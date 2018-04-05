import * as React from 'react';
import * as classNames from 'classnames';

import { Todo } from '../models';
import TodoTextInput from './TodoTextInput';
import {Dispatch} from "redux";

interface TodoItemProps {
    todo: Todo;
    editTodo: (todo: Todo, text: string) => void;
    deleteTodo: (todo: Todo) => void;
    completeTodo: (todo: Todo) => void;
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

    handleDoubleClick() {
        this.setState({ editing: true });
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
        if (this.state.editing) {
            element = (
                <TodoTextInput text={this.props.todo.label}
                    editing={this.state.editing}
                    onSave={(text) => this.handleSave(this.props.todo, text)}/>
            );
        } else {
            element = (
                <div>
                    {this.props.todo.label}
                    <span className="edit" />
                    <button className="destroy" onClick={() => this.props.deleteTodo(this.props.todo)}>x</button>
                </div>
            );
        }

        return (
            <li className={classNames({
                // completed: this.props.todo.completed,
                editing: this.state.editing
            })}>
                {element}
            </li>
        );
    }
}

export default TodoItem;