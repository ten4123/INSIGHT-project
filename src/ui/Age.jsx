import React from "react";

import styles from './Set.module.css'

function Age(props) {

    return (
        <div
            className={props.state ? styles.AgeSelected : styles.Age}
            onClick={props.onClick}>
            {props.title}
        </div>
    );
  }
  
  export default Age