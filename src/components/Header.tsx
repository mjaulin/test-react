import * as React from 'react';
import TodoTextInput from './TodoTextInput';
import {ErrorTodo, ErrorType} from "../models";

interface HeaderProps {
    isLoading: boolean;
    addTodo: (text: string) => any;
    error?: ErrorTodo
}

class Header extends React.Component<HeaderProps> {

    handleSave(text: string) {
        if (text.length !== 0) {
            this.props.addTodo(text);
        }
    }

    render() {
        return (
            <header className="header">
                <h2>My To Do List</h2>
                <TodoTextInput
                    disabled={this.props.isLoading || (this.props.error && this.props.error.type === ErrorType.LOADED)}
                    newTodo
                    onSave={this.handleSave.bind(this)}
                    placeholder="What needs to be done?" />
            </header>
        );
    }
}

export default Header;