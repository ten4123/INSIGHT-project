import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '../ui/Button';

import styles from './page.module.css';

import Lottie from "lottie-react";
import Logo from "../img/Logo.json";

function StartPage(props){

    const nav = useNavigate();

    return (
        <div className={styles.StartPage}>       
            <div className={styles.Logo}>
                <Lottie animationData={Logo} />
                <p className={styles.sub}>시선추적을 통한 나의 인테리어 관심사 찾기</p>
            </div>
            <Button
                title={"체험하기"}
                onClick={function(){
                    nav("/1")
                }}
            />
        </div>
    );
  }
  
  export default StartPage;