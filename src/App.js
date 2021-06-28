import './App.css';
import React from 'react';
import GamePageContainer from "./Containers/GamePageContainer";
import { Route, Switch } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import HomePageContainer from "./Containers/HomePageContainer";
import CreditsPageContainer from "./Containers/CreditsPageContainer";

function App() {
    return (
        <React.Fragment>
            <Switch>
                <Route exact path="/" component={HomePageContainer}/>
                <Route exact path="/game" component={GamePageContainer}/>
                <Route exact path="/credits" component={CreditsPageContainer}/>
            </Switch>
        </React.Fragment>
    );
}

export default App;
