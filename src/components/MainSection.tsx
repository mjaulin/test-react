import * as React from 'react'
import { Todo } from '../models';
import TodoItem from './TodoItem';
import { connect } from 'react-redux'

interface MainSectionProps {
    todos: Todo[];
    editTodo: (todo:Todo, text: string) => void;
    deleteTodo: (todo:Todo) => void;
    completeTodo: (todo:Todo, completed: boolean) => void;
}

class MainSection extends React.Component<MainSectionProps> {
    render() {
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