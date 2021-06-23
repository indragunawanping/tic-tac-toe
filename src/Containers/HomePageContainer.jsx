import React, { useState } from 'react';
import HomePage from "../Components/HomePage";
import { useHistory } from "react-router";

function HomePageContainer() {
    const [player, setPlayer] = useState(null);
    const [opponent, setOpponent] = useState(null);
    const [firstTurn, setFirstTurn] = useState(null);
    const [isSinglePlayer, setIsSinglePlayer] = useState(false);

    const history = useHistory();

    const handleButtonOClick = () => {
        setPlayer('O');
        setOpponent('X');
    }

    const handleButtonXClick = () => {
        setPlayer('X');
        setOpponent('O');
    }

    const handlePlayButtonClick = () => {
        const randIdx = Math.floor(Math.random() * 2);
        const firstTurn = randIdx === 0 ? player : opponent;
        setFirstTurn(firstTurn);
    }

    const handleOkButtonClick = () => {
        history.push('/game', {firstTurn: firstTurn, player: player, isSinglePlayer: isSinglePlayer})
    }

    const handlePlayerClick = (isSinglePlayer) => {
        setIsSinglePlayer(isSinglePlayer)
    }

    return (
        <HomePage handleButtonOClick={handleButtonOClick}
                  handleButtonXClick={handleButtonXClick}
                  handlePlayButtonClick={handlePlayButtonClick}
                  handleOkButtonClick={handleOkButtonClick}
                  handlePlayerClick={handlePlayerClick}
                  isSinglePlayer={isSinglePlayer}
                  player={player}
                  firstTurn={firstTurn}
        />
    );
}

export default HomePageContainer;
