import React, { useState } from 'react';
import HomePage from "../Components/HomePage";
import { useHistory } from "react-router";

function HomePageContainer() {
    const [activeSide, setActiveSide] = useState(null);

    const history = useHistory();

    const handleButtonOClick = () => {
        setActiveSide('O');
    }

    const handleButtonXClick = () => {
        setActiveSide('X');
    }

    const handleContinueButtonClick = () => {
        history.push('/game', { firstTurn: activeSide, player: activeSide })
    }

    return (
        <HomePage handleButtonOClick={handleButtonOClick}
                  handleButtonXClick={handleButtonXClick}
                  handleContinueButtonClick={handleContinueButtonClick}
                  activeSide={activeSide}
        />
    );
}

export default HomePageContainer;
