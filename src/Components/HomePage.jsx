import React from 'react';
import { Button, Image } from "semantic-ui-react";
import styles from './HomePage.module.css'
import ttt192 from '../Assets/logo192.png';
import logoO50 from '../Assets/logoO50.png';
import logoX50 from '../Assets/logoX50.png';

function HomePage(props) {
    console.log('props: ', props);

    return (
        <div className={styles.HomePageContainer}>
            <Image src={ttt192} size='small'/>
            <div className={styles.ButtonContainer}>
                <Button className={styles.Button} basic color={props.activeSide === 'O' ? "green" : null}
                        onClick={props.handleButtonOClick}>
                    <Image src={logoO50}/>
                </Button>
                <Button className={styles.Button} basic color={props.activeSide === 'X' ? "green" : null}
                        onClick={props.handleButtonXClick}>
                    <Image src={logoX50}/>
                </Button>
            </div>

            <div className={styles.ActiveSide}>You Choose: {props.activeSide}</div>
            {
                props.activeSide ? <Button color='green' className={styles.Button}
                                           onClick={props.handleContinueButtonClick}>Continue</Button> : <></>
            }

        </div>
    );
}

export default HomePage;