import React, { useState, useEffect } from 'react';
import styles from './MainCard.module.css';

function MainCard(props) {
    
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isFadingIn, setIsFadingIn] = useState(true);

    useEffect(() => {
        // 이미지가 변경되었을 때
        setIsFadingOut(true);

        const fadeOutTimeout = setTimeout(() => {
            setIsFadingOut(false);
            setIsFadingIn(true);
        }, 500); // 0.5초

        const fadeInTimeout = setTimeout(() => {
            setIsFadingIn(false);
        }, 1000); // 1초

        return () => {
            clearTimeout(fadeOutTimeout);
            clearTimeout(fadeInTimeout);
        };
    }, [props.imageIndex]);

    const fadeOutClass = isFadingOut ? 'fade-out' : '';
    const fadeInClass = isFadingIn ? 'fade-in' : '';

    return (
        <div className={`${styles.MainCard} ${fadeOutClass} ${fadeInClass}`}>
            <div
                className={styles.Image}
                style={{ backgroundImage: `url("img/image${props.imageIndex}.png")` }}
            ></div>
        </div>
    );
}

export default MainCard;