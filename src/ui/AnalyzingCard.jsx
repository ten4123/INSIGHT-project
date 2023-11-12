import React from "react";

import styles from './Card.module.css'

import Lottie from "lottie-react";
import Loading from "../img/Loading.json";

function AnalyzingCard(props) {

    return (
        <div className={styles.AnalyzingCard}>
            <Lottie animationData={Loading} />
            <p>아이트래킹 데이터를 통해 인테리어 관심사를 분석하고 있어요</p>
        </div>
    );
  }
  
  export default AnalyzingCard;