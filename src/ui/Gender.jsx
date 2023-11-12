import React from "react";

import styles from './Set.module.css'

function Gender(props) {


    return (
        <div
            className={props.state ? styles.GenderSelected : styles.Gender}
            onClick={props.onClick}>
            {props.title}
        </div>
    );
  }
  
  export default Gender