import React, { useState } from 'react';
import HomePage from "../Components/HomePage";
import { useHistory } from "react-router";

function HomePageContainer() {
    const [activeSide, setActiveSide] = useState('');

    const history = useHistory();

    const handleButtonOClick = () => {
        console.log('O');
        setActiveSide('O');
    }

    const handleButtonXClick = () => {
        console.log('X');
        setActiveSide('X');
    }

    const handleContinueButtonClick = () => {
        history.push('/game')
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
