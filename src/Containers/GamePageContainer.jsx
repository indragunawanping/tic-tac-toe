import React, { useCallback, useEffect, useRef, useState } from 'react';
import GamePage from "../Components/GamePage";
import { Patterns } from "../Patterns";
import { useHistory } from "react-router";

function GamePageContainer(props) {
    useEffect(() => {
        if (!props.location.state) {
            history.push('/');
        }
    }, [])

    const [boards, setBoards] = useState(['', '', '', '', '', '', '', '', '']);
    const [winner, setWinner] = useState(null);
    const [isTie, setIsTie] = useState(false);
    const [winningPattern, setWinningPattern] = useState([]);

    const firstTurn = props.location.state ? props.location.state.firstTurn : '';

    const [currentTurn, setCurrentTurn] = useState(firstTurn);
    const [player] = useState(props.location.state ? props.location.state.player : '');

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
        checkIfTie();
        checkWin();
        if (currentTurn !== player && !checkWin() && props.location.state.isSinglePlayer) {
            console.log('props.location.state.isSinglePlayer: ', props.location.state.isSinglePlayer);
            handleGetOpponentTurn();
        }
    }, [boards]);

    useEffect(() => {
        if (winner) {
            setIsModalOpen(true);
        }
    }, [winner]);

    const handleSquareClick = (square) => {
        const toUpdatedBoards = [...boards];

        if (!toUpdatedBoards[square]) {
            toUpdatedBoards[square] = currentTurn;
            setBoards(toUpdatedBoards);

            const updatedCurrentTurn = currentTurn === 'X' ? 'O' : 'X';
            setCurrentTurn(updatedCurrentTurn);
            // if (checkWin() === false) {
            //     handleGetOpponentTurn(toUpdatedBoards, updatedCurrentTurn);
            // }
        }
    };

    const handleGetOpponentTurn = () => {
        const emptySquares = [];
        const toUpdatedBoards = [...boards];

        toUpdatedBoards.map((sq, idx) => {
            if (sq === '') {
                emptySquares.push(idx);
            }
        })

        const randomIdx = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        toUpdatedBoards[randomIdx] = currentTurn;
        setBoards(toUpdatedBoards);

        const updatedCurrentTurn = currentTurn === 'X' ? 'O' : 'X';
        setCurrentTurn(updatedCurrentTurn);
        // console.log('currentTurn opponent: ', currentTurn);
    }

    const handleHomeButtonClick = () => {
        history.push('/')
    };

    const checkWin = () => {
        let isWinnerFound = false;
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
                isWinnerFound = true;
                setWinner(prevTurn);
                setWinningPattern(currPattern);
            }
        })

        return isWinnerFound;
    };

    const checkIfTie = () => {
        let filled = true;
        boards.forEach((square) => {
            if (square === '') {
                filled = false;
            }
        });

        if (filled) {
            setIsTie(true)
        }
    };

    const restartGame = () => {
        setBoards(['', '', '', '', '', '', '', '', '']);
        setCurrentTurn(firstTurn);
        setWinningPattern([]);
        setWinner(null);
    };

    const handleOkayButtonClick = () => {
        setIsModalOpen(false);
        setCurrentTurn(null);
        setIsTie(false);
    }

    return (
        <GamePage winner={winner}
                  isSinglePlayer={props.location.state.isSinglePlayer}
                  isTie={isTie}
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
