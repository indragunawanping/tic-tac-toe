import React, { useEffect, useState } from 'react';
import GamePage from "../Components/GamePage";
import { Patterns } from "../Patterns";

function GamePageContainer() {
    const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
    const [player, setPlayer] = useState('X');
    const [result, setResult] = useState({winner: 'none', state: 'none'});

    useEffect(() => {
        checkIfTie();
        checkWin();

        if (player === 'X') {
            setPlayer('O');
        } else {
            setPlayer('X');
        }
    }, [board]);

    useEffect(() => {
        if (result.state !== 'none') {
            alert(`Game Finished! Winning Player: ${result.winner}`);
            restartGame();
        }
    }, [result]);

    const chooseSquare = (square) => {
        setBoard(board.map((val, idx) => {
            if (idx === square && val === '') {
                return player;
            }

            return val;
        }));
    };

    const checkWin = () => {
        Patterns.forEach((currPattern) => {
            const firstPlayer = board[currPattern[0]];
            if (firstPlayer === '') return;
            let foundWinningPattern = true;
            currPattern.forEach((idx) => {
                if (board[idx] !== firstPlayer) {
                    foundWinningPattern = false;
                }
            });
            if (foundWinningPattern) {
                setResult({winner: player, state: 'won'})
            }
        })
    };

    const checkIfTie = () => {
        let filled = true;
        board.forEach((square) => {
            if (square === '') {
                filled = false;
            }
        });

        if (filled) {
            setResult({winner: 'No One', state: 'Tie'})
        }
    };

    const restartGame = () => {
        setBoard(['', '', '', '', '', '', '', '', '']);
        setPlayer('X');
    };

    return (
        <div className="App">
            <div className="board">
                <div className="row">
                    <GamePage val={board[0]} chooseSquare={() => {
                        chooseSquare(0)
                    }}/>
                    <GamePage val={board[1]} chooseSquare={() => {
                        chooseSquare(1)
                    }}/>
                    <GamePage val={board[2]} chooseSquare={() => {
                        chooseSquare(2)
                    }}/>
                </div>

                <div className="row">
                    <GamePage val={board[3]} chooseSquare={() => {
                        chooseSquare(3)
                    }}/>
                    <GamePage val={board[4]} chooseSquare={() => {
                        chooseSquare(4)
                    }}/>
                    <GamePage val={board[5]} chooseSquare={() => {
                        chooseSquare(5)
                    }}/>
                </div>

                <div className="row">
                    <GamePage val={board[6]} chooseSquare={() => {
                        chooseSquare(6)
                    }}/>
                    <GamePage val={board[7]} chooseSquare={() => {
                        chooseSquare(7)
                    }}/>
                    <GamePage val={board[8]} chooseSquare={() => {
                        chooseSquare(8)
                    }}/>
                </div>
            </div>
        </div>
    );
}

export default GamePageContainer;