import * as React from 'react'
import {ErrorType, ErrorTodo, Todo} from '../models';
import TodoItem from './TodoItem';
import { connect } from 'react-redux'

interface MainSectionProps {
    isLoading: boolean,
    todos: Todo[];
    editTodo: (todo:Todo, text: string) => void;
    deleteTodo: (todo:Todo) => void;
    completeTodo: (todo:Todo, completed: boolean) => void;
    error?: ErrorTodo,
}

class MainSection extends React.Component<MainSectionProps> {
    render() {
        if (this.props.error && this.props.error.type === ErrorType.LOADED) {
            return <p className='loading'>Sorry, it doesn't work...</p>
        }
        if (this.props.isLoading) {
            return <p className='loading'>Loading...</p>
        }

        return (
            <section className="todo">
                <ul>
                    {this.props.todos.map(todo =>
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            editTodo={this.props.editTodo}
                            completeTodo={this.props.completeTodo}
                            deleteTodo={this.props.deleteTodo} />
                    )}
                </ul>
            </section>
        );
    }
}

export default MainSection
