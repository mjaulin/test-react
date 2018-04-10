import * as React from 'react';
import { ErrorTodo } from "../models";

interface ErrorItemProps {
    error: ErrorTodo;
    deleteError: (error: ErrorTodo) => void;
}

class ErrorItem extends React.Component<ErrorItemProps> {
    
    render() {
        return (
            <div>
                <span onClick={() => this.props.deleteError(this.props.error)}>×</span>  
                {this.props.error.message}
            </div>
        );
    }
};

export default ErrorItem;