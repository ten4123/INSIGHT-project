import React from 'react';

import styles from './Button.module.css'

function Button(props) {

    return (
            <button className={styles.Button} onClick={props.onClick} style={{ opacity: props.opacity }}>
                {props.title}
            </button>                 
    );
  }
  
  export default Button