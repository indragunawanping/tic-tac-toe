import './App.css';
import React from 'react';
import SquareContainer from "./Containers/SquareContainer";
import { Route, Switch } from "react-router-dom";

function App() {
    return (
        <React.Fragment>
            <Switch>
                <Route exact path="/" component={SquareContainer}/>
            </Switch>
        </React.Fragment>
    );
}

export default App;
