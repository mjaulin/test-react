import * as React from 'react';
import { ErrorTodo } from "../models";

interface ErrorItemProps {
    error: ErrorTodo
}

class ErrorItem extends React.Component<ErrorItemProps> {

    render() {
        return (
            <div className="alert">
                <span className="closebtn">×</span>  
                <strong>Error</strong> {this.props.error.message}
            </div>
        );
    }
};

export default ErrorItem;