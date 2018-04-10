import * as React from 'react';
import ErrorItem from './ErrorItem';
import {ErrorTodo, ErrorType} from "../models";

interface ErrorsProps {
    errors: ErrorTodo[];
    deleteError: (error: ErrorTodo) => void;
}

class Errors extends React.Component<ErrorsProps> {

    render() {    
        let element;
        if (this.props.errors.length > 3) {
            element = (<p>...</p>)
        }
        return (
            <div className="message-box">
                {this.props.errors.slice(0, 3).map(error => <ErrorItem error={error} deleteError={this.props.deleteError} />)}
                {element}
            </div>
        )
    }
};

export default Errors;