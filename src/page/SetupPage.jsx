import React, { useState , useContext, useEffect } from "react";

import { GenderAgeContext } from './GenderAgeContext';

import { useNavigate } from 'react-router-dom';

import Gender from '../ui/Gender';
import Age from '../ui/Age';
import Button from '../ui/Button';

import styles from './page.module.css';

function SetupPage(props){
    
    const { gender, age, setGender, setAge } = useContext(GenderAgeContext);

    const nav = useNavigate();

    useEffect(() => {
        setGender(null);
        setAge(null);
    }, []); 

    return (
        <div className={styles.SetupPage}>
            <div className={styles.Setup}>
                <div className={styles.pageInfo}>
                    <h1 className={styles.h1}>본인의 성별과 연령대를 선택해주세요</h1>
                    <p className={styles.p}>해당 정보는 아이트래킹 데이터의 분석 용도로만 사용됩니다</p>
                </div>
                <div className={styles.choice}>
                    <h1 className={styles.h1}>성별</h1>
                    <div className={styles.gender}>
                        <Gender
                            title={"남성"}
                            onClick={function(){
                                setGender("man")
                            }}
                            state={gender === "man"}
                        />
                        <Gender
                            title={"여성"}
                            onClick={function(){
                                setGender("woman")
                            }}
                            state={gender === "woman"}
                        />
                    </div>      
                </div>
                <div className={styles.choice}>
                    <h1 className={styles.h1}>연령대</h1>
                    <div className={styles.age}>
                        <Age
                            title={"~19"}
                            onClick={function(){
                                setAge("~19")
                            }}
                            state={age === "~19"}
                        />
                        <Age
                            title={"20~29"}
                            onClick={function(){
                                setAge("20~29")
                            }}
                            state={age === "20~29"}
                        />
                        <Age
                            title={"30~39"}
                            onClick={function(){
                                setAge("30~39")
                            }}
                            state={age === "30~39"}
                        />
                        <Age
                            title={"40~49"}
                            onClick={function(){
                                setAge("40~49")
                            }}
                            state={age === "40~49"}
                        />
                        <Age
                            title={"50~59"}
                            onClick={function(){
                                setAge("50~59")
                            }}
                            state={age === "50~59"}
                        />
                        <Age
                            title={"60~"}
                            onClick={function(){
                                setAge("60~")
                            }}
                            state={age === "60~"}
                        />
                    </div> 
                </div>
            </div>
            <Button
                title={"다음"}
                onClick={function(){
                    nav("/2")
                    console.log(gender, age)
                }}
            />
        </div>
    );
  }
  
  export default SetupPage;
