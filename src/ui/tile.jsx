import React,{useState} from 'react';

import styles from './tile.module.css'

function Tile(props) {
    const { onClick, number, transparency } = props;

    const [currentNumber, setCurrentNumber] = useState(number);

    const tileStyle = {
        backgroundColor: `rgba(0, 0, 0, ${transparency})`,
        opacity: currentNumber === 0 ? 0 : 1,
    };

    const handleClick = () => {
        if (currentNumber > 0) {
            setCurrentNumber(prevNumber => prevNumber - 1);
            onClick(); // onClick 함수를 props로부터 호출
        }
    };

    return (
        <div className={styles.Tile} style={tileStyle} onClick={handleClick}>
            {currentNumber}
        </div>
    );
}
  
export default Tile