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

        if (currentTurn !== player && !checkWin().isWinnerFound && props.location.state.isSinglePlayer) {
            handleGetOpponentTurn(checkWin().lastSlot);
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
        }
    };

    const handleGetOpponentTurn = (lastSlot) => {
        const toUpdatedBoards = [...boards];

        if (lastSlot && !toUpdatedBoards[lastSlot]) {
            toUpdatedBoards[lastSlot] = currentTurn;
        } else {
            const emptySquares = [];
            toUpdatedBoards.map((sq, idx) => {
                if (sq === '') {
                    emptySquares.push(idx);
                }
            })

            const randomIdx = emptySquares[Math.floor(Math.random() * emptySquares.length)];
            toUpdatedBoards[randomIdx] = currentTurn;
        }
        setBoards(toUpdatedBoards);

        const updatedCurrentTurn = currentTurn === 'X' ? 'O' : 'X';
        setCurrentTurn(updatedCurrentTurn);
    }

    const handleHomeButtonClick = () => {
        history.push('/')
    };

    const checkWin = () => {
        let isWinnerFound = false;
        let lastSlot = null;
        Patterns.forEach((currPattern) => {
            const firstPlayer = boards[currPattern[0]];
            if (firstPlayer === '') return;
            let foundWinningPattern = true;
            const nonSamePattern = [];
            let samePattern = true;
            currPattern.forEach((idx, counter) => {
                if (boards[idx] !== firstPlayer) {
                    foundWinningPattern = false;
                    nonSamePattern.push(idx);
                }
            });

            if(nonSamePattern.length === 1){
                lastSlot = nonSamePattern[0];
                console.log('firstPlayer: ', firstPlayer);
                console.log('lastSlot: ', lastSlot);
            }
            if (foundWinningPattern) {
                isWinnerFound = true;
                setWinner(prevTurn);
                setWinningPattern(currPattern);
            }
        })

        return {isWinnerFound, lastSlot};
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
