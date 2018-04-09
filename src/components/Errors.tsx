import * as React from 'react';
import ErrorItem from './ErrorItem';
import {ErrorTodo, ErrorType} from "../models";

interface ErrorsProps {
    errors: ErrorTodo[]
}

class Errors extends React.Component<ErrorsProps> {

    render() {
        return this.props.errors.map(error => <ErrorItem error={error} />);
    }
};

export default Errors;