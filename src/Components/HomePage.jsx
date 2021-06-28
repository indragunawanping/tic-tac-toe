import React from 'react';
import { Button, Image, Modal } from "semantic-ui-react";
import styles from './HomePage.module.css'
import ttt192 from '../Assets/logo192.png';
import logoO50 from '../Assets/logoO50.png';
import logoX50 from '../Assets/logoX50.png';
import { Link } from "react-router-dom";

function HomePage(props) {
    return (
        <div className={styles.HomePageContainer}>
            <div className={styles.PlayerType}>
                <Button.Group>
                    <Button onClick={() => props.handlePlayerClick(true)} positive={props.isSinglePlayer}>1P</Button>
                    <Button.Or/>
                    <Button onClick={() => props.handlePlayerClick(false)} positive={!props.isSinglePlayer}>2P</Button>
                </Button.Group>
            </div>

            <Image src={ttt192} size='small'/>
            <div className={styles.ButtonContainer}>
                <Button className={styles.Button} basic color={props.player === 'O' ? "green" : null}
                        onClick={props.handleButtonOClick}>
                    <Image src={logoO50}/>
                </Button>
                <Button className={styles.Button} basic color={props.player === 'X' ? "green" : null}
                        onClick={props.handleButtonXClick}>
                    <Image src={logoX50}/>
                </Button>
            </div>

            {
                props.player &&
                <>
                    <div className={styles.PlayerOpponentContainer}>
                        <div className={styles.PlayerContainer}>
                            <div className={styles.Player}>P1</div>
                            <div className={styles.MiniImage}>
                                <Image src={props.player === 'O' ? logoO50 : logoX50} size='mini'/>
                            </div>
                        </div>

                        <div className={styles.OpponentContainer}>
                            <div className={styles.Player}>P2</div>
                            <div className={styles.MiniImage}>
                                <Image src={props.player === 'O' ? logoX50 : logoO50} size='mini'/>
                            </div>
                        </div>
                    </div>

                    <Button color='green'
                            className={styles.Button}
                            onClick={props.handlePlayButtonClick}>Play</Button>
                </>
            }

            <Modal open={!!props.firstTurn} size={'mini'}>
                <div className={styles.ModalTitle}>
                    <Modal.Content
                        content={`${'You Get'} ${props.firstTurn === props.player ? 'First Turn' : 'Second Turn'}`}/>
                </div>

                <Modal.Actions>
                    <Button color='green' onClick={props.handleOkButtonClick}>Ok</Button>
                </Modal.Actions>
            </Modal>

            <Link to="/credits">credits</Link>
        </div>
    );
}

export default HomePage;
