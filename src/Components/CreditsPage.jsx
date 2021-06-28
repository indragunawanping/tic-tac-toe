import React from 'react';
import styles from './CreditsPage.module.css'
import { Link } from "react-router-dom";
import { Button, Icon, Image } from "semantic-ui-react";
import ttt192 from '../Assets/logo192.png';

function CreditsPage() {
    return (
        <div className={styles.CreditsPageContainer}>
            <div className={styles.Credits}>
                <Image className={styles.Logo} src={ttt192}/>
                <div className={styles.CreditsText}>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </div>
            <Link to="/">
                <Button icon labelPosition='left'><Icon name='home'/>Home
                </Button>
            </Link>
        </div>
    );
}

export default CreditsPage;
