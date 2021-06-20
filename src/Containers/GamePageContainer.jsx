import React, { useEffect, useRef, useState } from 'react';
import GamePage from "../Components/GamePage";
import { Patterns } from "../Patterns";
import { useHistory } from "react-router";

function GamePageContainer(props) {
    console.log('props: ', props.location.state);

    const [boards, setBoards] = useState(['', '', '', '', '', '', '', '', '']);
    const [currentTurn, setCurrentTurn] = useState(props.location.state.firstTurn);
    const [winner, setWinner] = useState(null);
    const [winningPattern, setWinningPattern] = useState([]);
    const [player] = useState(props.location.state.player);

    const GetPrevious = (currentTurn) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = currentTurn;
        });
        return ref.current;
    }

    const prevTurn = GetPrevious(currentTurn);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const history = useHistory();

    useEffect(() => {
        console.log('kepanggil');
        checkIfTie();
        checkWin();
    }, [boards]);

    useEffect(() => {
        if (winner !== null) {
            setIsModalOpen(true);
        }
    }, [winner]);

    const handleSquareClick = (square) => {
        const cloneBoards = [...boards];

        if (!cloneBoards[square]) {
            cloneBoards[square] = currentTurn;
            currentTurn === 'X' ? setCurrentTurn('O') : setCurrentTurn('X');
            setBoards(cloneBoards);
        }
    };

    const handleHomeButtonClick = () => {
        history.push('/')
    };

    const checkWin = () => {
        Patterns.forEach((currPattern) => {
            const firstPlayer = boards[currPattern[0]];
            if (firstPlayer === '') return;
            let foundWinningPattern = true;
            currPattern.forEach((idx) => {
                if (boards[idx] !== firstPlayer) {
                    foundWinningPattern = false;
                }
            });
            if (foundWinningPattern) {
                setWinner(prevTurn);
                setWinningPattern(currPattern);
            }
        })
    };

    const checkIfTie = () => {
        let filled = true;
        boards.forEach((square) => {
            if (square === '') {
                filled = false;
            }
        });

        if (filled) {
            setWinner(null)
        }
    };

    const restartGame = () => {
        setBoards(['', '', '', '', '', '', '', '', '']);
        setCurrentTurn(props.location.state.firstTurn)
    };

    const handleOkayButtonClick = () => {
        setIsModalOpen(false);
        setWinner(null);
        setCurrentTurn(null);
    }

    return (
        <GamePage winner={winner}
                  player={player}
                  boards={boards}
                  currentTurn={currentTurn}
                  isModalOpen={isModalOpen}
                  winningPattern={winningPattern}
                  handleSquareClick={handleSquareClick}
                  handleHomeButtonClick={handleHomeButtonClick}
                  handleRestartButtonClick={restartGame}
                  handleOkayButtonClick={handleOkayButtonClick}
        />
    )
}

export default GamePageContainer;
