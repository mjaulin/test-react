import * as React from "react";
import * as ReactDOM from "react-dom";
import { Store, createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/App';
import rootReducer from './reducers/root';

const initalState = {};

const store: Store<any> = createStore(rootReducer, initalState)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
)