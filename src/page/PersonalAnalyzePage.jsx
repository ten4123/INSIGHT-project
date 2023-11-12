import React, { useState, useEffect, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import GenderAgeContext from './GenderAgeContext';

import PersonalCard from '../ui/PersonalCard';
import Button from '../ui/Button';

import styles from './page.module.css';

import { db } from "../firebase"

function PresonalAnalyzePage(props) {

    const nav = useNavigate();

    const { gender, age, countData} = useContext(GenderAgeContext);

    const styleArray = countData.find(item => item.class === "style");
    styleArray.counts.sort((a, b) => b.count - a.count);
    styleArray.counts = styleArray.counts;
    const styleCounts = styleArray ? styleArray.counts.map(item => item.count).slice(0, 5) : [];
    const styleId = styleArray ? styleArray.counts.map(item => item.id).slice(0, 5) : [];

    const furnitureArray = countData.find(item => item.class === "furniture");
    furnitureArray.counts.sort((a, b) => b.count - a.count);
    furnitureArray.counts = furnitureArray.counts;
    const furnitureCounts = furnitureArray ? furnitureArray.counts.map(item => item.count).slice(0, 5) : [];
    const furnitureId = furnitureArray ? furnitureArray.counts.map(item => item.id).slice(0, 5) : [];

    const colorArray = countData.find(item => item.class === "color");
    colorArray.counts.sort((a, b) => b.count - a.count);
    colorArray.counts = colorArray.counts;
    const colorCounts = colorArray ? colorArray.counts.map(item => item.count).slice(0, 5) : [];
    const colorId = colorArray ? colorArray.counts.map(item => item.id).slice(0, 5) : [];

    console.log(gender)
    console.log(age)
    console.log(countData)

    useEffect(() => {
        let timestamp = new Date().getTime().toString();
        db.collection('userData').doc(timestamp).set({
            gender:gender,
            age:age,
            countData:countData
        })
    }, []);

    return (
        <div className={styles.PresonalAnalyzePage}>
            <h1 className={styles.h1}>인테리어 사진을 보는 동안 모은 아이트래킹 데이터를 통해<br/> 분석한 사용자님의 인테리어 관심사 결과에요</h1>
            <div
                className={styles.CardList}
            >
                <PersonalCard
                    title={<>
                        <span style={{ color: '#407BFF' }}>
                            {styleArray.counts.map(item => item.id).slice(0, 1)}
                        </span>
                        한 스타일의 가구를 제일 오래 보았어요.
                    </>}
                    labels={styleId} 
                    count={styleCounts}/>
                <PersonalCard 
                title={<>
                    <span style={{ color: '#407BFF' }}>
                        {furnitureArray.counts.map(item => item.id).slice(0, 1)}
                    </span>
                    을(를) 제일 오래 보았어요.
                </>}
                    labels={furnitureId}
                    count={furnitureCounts}/>
                <PersonalCard
                    title={<>
                        <span style={{ color: '#407BFF' }}>
                            {colorArray.counts.map(item => item.id).slice(0, 1)}
                        </span>
                        색 가구를 제일 오래 보았어요.
                    </>}
                    labels={colorId}
                    count={colorCounts}/>
            </div>
            <Button
                title={"다음"}
                onClick={function(){
                    nav('/4');
                }}
            />    
        </div>
    );
  }
  
  export default PresonalAnalyzePage;