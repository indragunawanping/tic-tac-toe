import React from 'react';
import styles from './GamePage.module.css'
import { Button, Divider, Grid, Header, Icon, Image, Modal, Segment, Transition } from "semantic-ui-react";
import logoO50 from '../Assets/logoO50.png';
import logoX50 from '../Assets/logoX50.png';

function GamePage(props) {
    const renderPlayer = (player) => {
        if (player === 'O') {
            return <Image src={logoO50}/>
        } else if (player === 'X') {
            return <Image src={logoX50}/>
        } else return <></>
    }

    const renderBoardRow = () => {
        const rowElements = [];
        for (let i = 0; i < 3; i++) {
            rowElements.push(
                <div className={styles.Row} key={i}>
                    <div className={`${styles.Square} ${props.winningPattern.includes(i * 3) ? styles.SquareWin : null}`}
                         onClick={() => {props.handleSquareClick(i * 3)}}>
                        <Transition visible={!!props.boards[i * 3]} animation='jiggle' duration={500}>
                            {renderPlayer(props.boards[i * 3])}
                        </Transition>
                    </div>

                    <div
                        className={`${styles.Square} ${props.winningPattern.includes(i * 3 + 1) ? styles.SquareWin : null}`}
                        onClick={() => {props.handleSquareClick(i * 3 + 1)}}>
                        <Transition visible={!!props.boards[i * 3 + 1]} animation='jiggle' duration={500}>
                            {renderPlayer(props.boards[i * 3 + 1])}
                        </Transition>
                    </div>

                    <div
                        className={`${styles.Square} ${props.winningPattern.includes(i * 3 + 2) ? styles.SquareWin : null}`}
                        onClick={() => {props.handleSquareClick(i * 3 + 2)}}>
                        <Transition visible={!!props.boards[i * 3 + 2]} animation='jiggle' duration={500}>
                            {renderPlayer(props.boards[i * 3 + 2])}
                        </Transition>
                    </div>
                </div>
            )
        }

        return rowElements;
    }

    return (
        props.winner ?
            <Modal open={props.isModalOpen} size={'mini'}>
                <div className={styles.ModalTitle}>
                    <Header content={props.player === props.winner ? 'You Win!' : 'You Lose!'}/>
                </div>

                <div className={styles.WinnerOuterContainer}>
                    <Modal.Content image>
                        <div className={styles.WinnerContainer}>
                            {renderPlayer(props.winner)}
                            <div className={styles.WinnerText}>Winner</div>
                        </div>
                    </Modal.Content>
                </div>

                <Modal.Actions>
                    <Button color='green' onClick={props.handleOkayButtonClick}>Okay</Button>
                </Modal.Actions>
            </Modal>
            :
            <div className={styles.BoardContainer}>
                {
                    props.currentTurn ? <div className={styles.Title}>TURN</div> :
                        <div className={styles.TitleBoard}>
                            {props.player === props.winner ? 'You Win!' : 'You Lose!'}
                        </div>
                }
                <div className={styles.Turn}>
                    {renderPlayer(props.currentTurn)}
                </div>

                <div className={styles.Board}>
                    {renderBoardRow()}
                </div>

                <Segment>
                    <Grid columns={2} relaxed='very'>
                        <Grid.Column>
                            <div className={styles.PlayerContainer}>
                                <div>Player</div>
                                <div className={styles.PlayerImage}>
                                    {renderPlayer(props.player)}
                                </div>
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            <div className={styles.PlayerContainer}>
                                <div>Opponent</div>
                                <div className={styles.PlayerImage}>
                                    {renderPlayer(props.player === 'O' ? 'X' : 'O', 'mini')}
                                </div>
                            </div>
                        </Grid.Column>
                    </Grid>

                    <Divider vertical>VS</Divider>
                </Segment>

                <div className={styles.ButtonContainer}>
                    <Button basic color='green'
                            className={`${styles.Button} ${styles.ButtonLeft}`}
                            onClick={props.handleHomeButtonClick}>
                        <Icon name='home'/>
                    </Button>

                    <Button color='green'
                            className={`${styles.Button} ${styles.ButtonRight}`}
                            onClick={props.handleRestartButtonClick}>
                        <Icon name='redo'/>
                    </Button>
                </div>
            </div>
    );
}

export default GamePage;
