import React from 'react';
import '../App.css';
import { Button, Modal } from "semantic-ui-react";

function GamePage({val, chooseSquare}) {
    return (
        <div className="square" onClick={chooseSquare}>
            {val}
        </div>
    );
}

export default GamePage;
