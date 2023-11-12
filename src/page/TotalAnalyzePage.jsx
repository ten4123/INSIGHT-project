import React, { useState, useEffect, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import GenderAgeContext from './GenderAgeContext';

import {
    Chart as chartjs,
    LineElement,
    BarElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js'

import { Bar } from 'react-chartjs-2';

import _ from 'lodash';

import { db } from "../firebase"

import Button from '../ui/Button';

import styles from './page.module.css';

chartjs.register(
    LineElement,
    BarElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

function TotalAnalyzePage(props) {

    const nav = useNavigate();

    const { gender, age, countData} = useContext(GenderAgeContext);

    const [data, setData] = useState([]);

    useEffect(() => {
        
        let tempData = []
        db.collection('userData').get().then(function(qs){
            qs.forEach(function(doc){
                tempData.push(doc.data())
            })
            setData(tempData);   
        })

    }, []);  
    
    console.log(data)
         
    // data의 전체 배열의 수, age, gender를 파악하고 이를 비율로 계산
    const totalDataLength = data.length;
    const manDataCount = data.filter((item) => item.gender === 'man').length;
    const womanDataCount = data.filter((item) => item.gender === 'woman').length;

    // 체험자와 같은 나이대 추출
    const ExDataCount = data.filter(item => item.age === age)

    // 체험자와 같은 나이대 남성
    const ExDataManCount = ExDataCount.filter(item => item.gender === 'man')
    console.log(ExDataManCount)

    // 체험자와 같은 나이대 여성
    const ExDataWomanCount = ExDataCount.filter(item => item.gender === 'woman')
    console.log(ExDataWomanCount)

    // 체험자와 같은 나이대 남성
    //style
    const styleCountsInExDataCount = ExDataManCount.map(item => {
        const styleData = item.countData.find(dataItem => dataItem.class === 'style');
        return styleData ? styleData.counts : [];
    });

    const ExStyleCounts = _.flatMap(styleCountsInExDataCount);

    const groupedExStyleCounts = _.groupBy(ExStyleCounts, 'id');
    const summedExStyleCounts = _.map(groupedExStyleCounts, (counts, id) => ({
    id,
    count: _.sumBy(counts, 'count'),
    }));

    const sortedExStyleCounts = summedExStyleCounts.sort((a, b) => b.count - a.count);

    let mostPopularExStyleId = "";
    
    if (ExDataManCount.length > 1){
        mostPopularExStyleId = sortedExStyleCounts[0].id;
        console.log(`체험자와 같은 나이대 남성 가장 인기 있는 스타일 ID: ${mostPopularExStyleId}`);
    }else if(ExDataManCount.length <= 1){
        console.log(`아직 체험자와 같은 나이대 남성 유저의 서비스 체험 결과가 없습니다.`);
    }

    //furniture
    const furnitureCountsInExDataCount = ExDataManCount.map(item => {
        const furnitureData = item.countData.find(dataItem => dataItem.class === 'furniture');
        return furnitureData ? furnitureData.counts : [];
    });

    const ExFurnitureCounts = _.flatMap(furnitureCountsInExDataCount);

    const groupedExFurnitureCounts = _.groupBy(ExFurnitureCounts, 'id');
    const summedExFurnitureCounts = _.map(groupedExFurnitureCounts, (counts, id) => ({
    id,
    count: _.sumBy(counts, 'count'),
    }));

    const sortedExFurnitureCounts = summedExFurnitureCounts.sort((a, b) => b.count - a.count);

    let mostPopularExFurnitureId = "";

    if (ExDataManCount.length > 1){
        mostPopularExFurnitureId = sortedExFurnitureCounts[0].id;
        console.log(`체험자와 같은 나이대 남성 가장 인기 있는 가구 ID: ${mostPopularExFurnitureId}`);
    }else if(ExDataManCount.length <= 1){
        console.log(`아직 체험자와 같은 나이대 남성 유저의 서비스 체험 결과가 없습니다.`);
    }
 
    let manImageUrl = "";

    if (mostPopularExFurnitureId === "의자") {
        manImageUrl = `img/의자.png`;
    }else if (mostPopularExFurnitureId === "책상") {
        manImageUrl = `img/책상.png`;
    }else if (mostPopularExFurnitureId === "액자") {
        manImageUrl = `img/액자.png`;
    }else if (mostPopularExFurnitureId === "책장") {
        manImageUrl = `img/책장.png`;
    }else if (mostPopularExFurnitureId === "소파") {
        manImageUrl = `img/소파.png`;
    }else if (mostPopularExFurnitureId === "식탁") {
        manImageUrl = `img/식탁.png`;
    }else if (mostPopularExFurnitureId === "식물") {
        manImageUrl = `img/식물.png`;
    }else if (mostPopularExFurnitureId === "조명") {
        manImageUrl = `img/조명.png`;
    }

    //color
    const colorCountsInExDataCount = ExDataManCount.map(item => {
        const colorData = item.countData.find(dataItem => dataItem.class === 'color');
        return colorData ? colorData.counts : [];
    });

    const ExColorCounts = _.flatMap(colorCountsInExDataCount);

    const groupedExColorCounts = _.groupBy(ExColorCounts, 'id');
    const summedExColorCounts = _.map(groupedExColorCounts, (counts, id) => ({
    id,
    count: _.sumBy(counts, 'count'),
    }));

    const sortedExColorCounts = summedExColorCounts.sort((a, b) => b.count - a.count);

    let mostPopularExColorId = "";

    if (ExDataManCount.length > 1){
        mostPopularExColorId = sortedExColorCounts[0].id;
        console.log(`체험자와 같은 나이대 남성 가장 인기 있는 컬러 ID: ${mostPopularExColorId}`);
    }else if(ExDataManCount.length <= 1){
        console.log(`아직 체험자와 같은 나이대 남성 유저의 서비스 체험 결과가 없습니다.`);
    }

    // 체험자와 같은 나이대 여성
    //style
    const styleCountsInExDataWomanCount = ExDataWomanCount.map(item => {
        const styleData = item.countData.find(dataItem => dataItem.class === 'style');
        return styleData ? styleData.counts : [];
    });

    const ExStyleWomanCounts = _.flatMap(styleCountsInExDataWomanCount);

    const groupedExStyleWomanCounts = _.groupBy(ExStyleWomanCounts, 'id');
    const summedExStyleWomanCounts = _.map(groupedExStyleWomanCounts, (counts, id) => ({
    id,
    count: _.sumBy(counts, 'count'),
    }));

    const sortedExStyleWomanCounts = summedExStyleWomanCounts.sort((a, b) => b.count - a.count);

    let mostPopularExStyleWomanId = "";
    
    if (ExDataWomanCount.length > 1){
        mostPopularExStyleWomanId = sortedExStyleWomanCounts[0].id;
        console.log(`체험자와 같은 나이대 여성 가장 인기 있는 스타일 ID: ${mostPopularExStyleWomanId}`);
    }else if(ExDataWomanCount.length <= 1){
        console.log(`아직 체험자와 같은 나이대 여성 유저의 서비스 체험 결과가 없습니다.`);
    }

    //furniture
    const furnitureCountsInExDataWomanCount = ExDataWomanCount.map(item => {
        const furnitureData = item.countData.find(dataItem => dataItem.class === 'furniture');
        return furnitureData ? furnitureData.counts : [];
    });

    const ExFurnitureWomanCounts = _.flatMap(furnitureCountsInExDataWomanCount);

    const groupedExFurnitureWomanCounts = _.groupBy(ExFurnitureWomanCounts, 'id');
    const summedExFurnitureWomanCounts = _.map(groupedExFurnitureWomanCounts, (counts, id) => ({
    id,
    count: _.sumBy(counts, 'count'),
    }));

    const sortedExFurnitureWomanCounts = summedExFurnitureWomanCounts.sort((a, b) => b.count - a.count);

    let mostPopularExFurnitureWomanId = "";

    if (ExDataWomanCount.length > 1){
        mostPopularExFurnitureWomanId = sortedExFurnitureWomanCounts[0].id;
        console.log(`체험자와 같은 나이대 여성 가장 인기 있는 가구 ID: ${mostPopularExFurnitureWomanId}`);
    }else if(ExDataWomanCount.length <= 1){
        console.log(`아직 체험자와 같은 나이대 여성 유저의 서비스 체험 결과가 없습니다.`);
    }

    let womanImageUrl = "";

    if (mostPopularExFurnitureWomanId === "의자") {
        womanImageUrl = `img/의자.png`;
    }else if (mostPopularExFurnitureWomanId === "책상") {
        womanImageUrl = `img/책상.png`;
    }else if (mostPopularExFurnitureWomanId === "액자") {
        womanImageUrl = `img/액자.png`;
    }else if (mostPopularExFurnitureWomanId === "책장") {
        womanImageUrl = `img/책장.png`;
    }else if (mostPopularExFurnitureWomanId === "소파") {
        womanImageUrl = `img/소파.png`;
    }else if (mostPopularExFurnitureWomanId === "식탁") {
        womanImageUrl = `img/식탁.png`;
    }else if (mostPopularExFurnitureWomanId === "식물") {
        womanImageUrl = `img/식물.png`;
    }else if (mostPopularExFurnitureWomanId === "조명") {
        womanImageUrl = `img/조명.png`;
    }

    //color
    const colorCountsInExDataWomanCount = ExDataWomanCount.map(item => {
        const colorData = item.countData.find(dataItem => dataItem.class === 'color');
        return colorData ? colorData.counts : [];
    });

    const ExColorWomanCounts = _.flatMap(colorCountsInExDataWomanCount);

    const groupedExColorWomanCounts = _.groupBy(ExColorWomanCounts, 'id');
    const summedExColorWomanCounts = _.map(groupedExColorWomanCounts, (counts, id) => ({
    id,
    count: _.sumBy(counts, 'count'),
    }));

    const sortedExColorWomanCounts = summedExColorWomanCounts.sort((a, b) => b.count - a.count);

    let mostPopularExColorWomanId = "";

    if (ExDataWomanCount.length > 1){
        mostPopularExColorWomanId = sortedExColorWomanCounts[0].id;
        console.log(`체험자와 같은 나이대 여성 가장 인기 있는 컬러 ID: ${mostPopularExColorWomanId}`);
    }else if(ExDataWomanCount.length <= 1){
        console.log(`아직 체험자와 같은 나이대 여성 유저의 서비스 체험 결과가 없습니다.`);
    }

    //3번째 박스 구성
    const manRatio = ((manDataCount  / totalDataLength) * 100).toFixed(0);
    const womanRatio = ((womanDataCount  / totalDataLength) * 100).toFixed(0);
    console.log(`전체 배열의 수 = ${totalDataLength}`);
    console.log(`남성 체험자의 수 = ${manDataCount}`);
    console.log(`여성 체험자의 수 = ${womanDataCount}`);
    console.log(`남성 체험자 비율 = ${manRatio}`);
    console.log(`여성 체험자 비율 = ${womanRatio}`);

    //style
    const styleCountsInData = data.map(item => {
        const styleData = item.countData.find(dataItem => dataItem.class === 'style');
        return styleData ? styleData.counts : [];
    });

    const mergedStyleCounts = _.flatMap(styleCountsInData);

    const groupedStyleCounts = _.groupBy(mergedStyleCounts, 'id');
    const summedStyleCounts = _.map(groupedStyleCounts, (counts, id) => ({
    id,
    count: _.sumBy(counts, 'count'),
    }));

    const sortedStyleCounts = summedStyleCounts.sort((a, b) => b.count - a.count);
    const top5StyleId = sortedStyleCounts.slice(0, 5).map(item => item.id);
    const top5StyleCount = sortedStyleCounts.slice(0, 5).map(item => item.count * 0.1);
    console.log(top5StyleId)
    console.log(top5StyleCount)


    let mostPopularStyleId = "";
    let popularStyleCount = "";
    
    if (sortedStyleCounts.length > 0){
        mostPopularStyleId = sortedStyleCounts[0].id;
        popularStyleCount = sortedStyleCounts[0].count * 0.1;
        console.log(`가장 인기 있는 스타일 ID: ${mostPopularStyleId}`);
        console.log(`가장 인기 있는 스타일 Count: ${popularStyleCount}`);
    }

    //furniture
    const furnitureCountsInData = data.map(item => {
        const furnitureData = item.countData.find(dataItem => dataItem.class === 'furniture');
        return furnitureData ? furnitureData.counts : [];
    });

    const mergedFurnitureCounts = _.flatMap(furnitureCountsInData);

    const groupedFurnitureCounts = _.groupBy(mergedFurnitureCounts, 'id');
    const summedFurnitureCounts = _.map(groupedFurnitureCounts, (counts, id) => ({
    id,
    count: _.sumBy(counts, 'count'),
    }));

    const sortedFurnitureCounts = summedFurnitureCounts.sort((a, b) => b.count - a.count);
    const top5FurnitureId = sortedFurnitureCounts.slice(0, 5).map(item => item.id);
    const top5FurnitureCount = sortedFurnitureCounts.slice(0, 5).map(item => item.count * 0.1);
    console.log(top5FurnitureId)
    console.log(top5FurnitureCount)


    let mostPopularFurnitureId = "";
    let popularFurnitureCount = "";

    if (sortedFurnitureCounts.length > 0){
        mostPopularFurnitureId = sortedFurnitureCounts[0].id;
        popularFurnitureCount = sortedFurnitureCounts[0].count * 0.1;
        console.log(`가장 인기 있는 스타일 ID: ${mostPopularFurnitureId}`);
        console.log(`가장 인기 있는 스타일 Count: ${popularFurnitureCount}`);
    }
      
    //color
    const colorCountsInData = data.map(item => {
        const colorData = item.countData.find(dataItem => dataItem.class === 'color');
        return colorData ? colorData.counts : [];
    });

    const mergedColorCounts = _.flatMap(colorCountsInData);

    const groupedColorCounts = _.groupBy(mergedColorCounts, 'id');
    const summedColorCounts = _.map(groupedColorCounts, (counts, id) => ({
    id,
    count: _.sumBy(counts, 'count'),
    }));

    const sortedColorCounts = summedColorCounts.sort((a, b) => b.count - a.count);
    const top5ColorId = sortedColorCounts.slice(0, 5).map(item => item.id);
    const top5ColorCount = sortedColorCounts.slice(0, 5).map(item => item.count  * 0.1);
    console.log(top5ColorId)
    console.log(top5ColorCount)
    console.log(data.filter((item) => item.age === '~19').length)
    console.log(data.filter((item) => item.age === '20~29').length)
    console.log(data.filter((item) => item.age === '30~39').length)
    console.log(data.filter((item) => item.age === '40~49').length)
    console.log(data.filter((item) => item.age === '50~59').length)
    console.log(data.filter((item) => item.age === '60~').length)
    let mostPopularColorId = "";
    let popularColorCount = "";

    if (sortedColorCounts.length > 0){
        mostPopularColorId = sortedColorCounts[0].id;
        popularColorCount = sortedColorCounts[0].count * 0.1;
        console.log(`가장 인기 있는 스타일 ID: ${mostPopularColorId}`);
        console.log(`가장 인기 있는 스타일 Count: ${popularColorCount}`);
    }

    let menImageClassName = styles.MenImage;

    if (totalDataLength > 20 && totalDataLength <= 30) {
        menImageClassName = styles.MenImage2;
    }else if (totalDataLength > 30 && totalDataLength <= 40) {
        menImageClassName = styles.MenImage3;
    }else if (totalDataLength > 40 && totalDataLength <= 50) {
        menImageClassName = styles.MenImage4;
    }else if (totalDataLength > 50) {
        menImageClassName = styles.MenImage5;
    }

    const menImages = Array(totalDataLength).fill(
        <img
            src={"img/men.png"}
            alt={`인원`}
            className={menImageClassName}
        />
    );

    const styleGraphData = {
        labels: top5StyleId,
        datasets: [{
            labels: '스타일',
            data: top5StyleCount,
            backgroundColor: ['#407BFF', '#C5D7FF', '#C5D7FF', '#C5D7FF', '#C5D7FF'],
            borderWidth: 0,
            borderRadius: 8,
        }]
    }

    const furnitureGraphData = {
        labels: top5FurnitureId,
        datasets: [{
            labels: '가구',
            data: top5FurnitureCount,
            backgroundColor: ['#407BFF', '#C5D7FF', '#C5D7FF', '#C5D7FF', '#C5D7FF'],
            borderWidth: 0,
            borderRadius: 8,
        }]
    }

    const colorGraphData = {
        labels: top5ColorId,
        datasets: [{
            labels: '컬러',
            data: top5ColorCount,
            backgroundColor: ['#407BFF', '#C5D7FF', '#C5D7FF', '#C5D7FF', '#C5D7FF'],
            borderWidth: 0,
            borderRadius: 8,
        }]
    }

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 24
                    },
                },
            },
            y: {
                display: false,
                grid: {
                    display: false,
                },
            },
        },
    };        



    return (
        <div className={styles.TotalAnalyzePage}>
            <div className={styles.TotalCardArray}>
                <div className={styles.TotalCard}>
                <p className={styles.boldP}>지금까지 {totalDataLength}명의 사람들이 INSIGHT 서비스를 체험했어요.</p>
                    <div className={styles.menImages}>
                        {menImages}
                    </div>
                </div>
                <div className={styles.TotalCard}>
                    <div className={styles.SameAge}>
                        {mostPopularExStyleId !== "" ? (
                            <div className={styles.Sortation}>
                                <p className={styles.boldP}>
                                나와 같은 연령대의 남성들은<br/>이 특징들을 좋아했어요.
                                </p>
                                <div className={styles.Align}>
                                    <img alt="가구" src={manImageUrl}/>
                                    {mostPopularExFurnitureId}
                                    <div>
                                        {mostPopularExStyleId}
                                        <br/>
                                        {mostPopularExColorId}
                                    </div>
                                </div>
                            </div>
                            ) : (
                            <p className={styles.boldP}>아직 나와 같은 나이대의 남성이<br/>서비스를 체험해보지 않았어요!</p>
                            )
                        }
                        {mostPopularExStyleWomanId !== "" ? (
                            <div className={styles.Sortation}>
                                <p className={styles.boldP}>
                                나와 같은 연령대의 여성들은<br/>이 특징들을 좋아했어요.
                                </p>
                                <div className={styles.Align}>
                                    <img alt="가구" src={womanImageUrl}/>
                                    {mostPopularExFurnitureWomanId}
                                    <div>
                                        {mostPopularExStyleWomanId}
                                        <br/>
                                        {mostPopularExColorWomanId}
                                    </div>
                                </div>
                            </div>
                            ) : (
                            <p className={styles.boldP}>아직 나와 같은 나이대의 여성이<br/>서비스를 체험해보지 않았어요!</p>
                            )
                        }
                    </div>
                </div>
                <div className= {styles.TallTotalCard}>
                    <p className={styles.boldP}>서비스를 체험한 사람들이 오래 바라본 제품들의 특징이에요.</p>         
                    <div className={styles.GraphArray}>
                        <div className={styles.Graph}>
                            <Bar
                                    data={styleGraphData}
                                    options={options}
                            />
                            <p>가장 오래 본 스타일 (초)</p> 
                        </div>
                        <div className={styles.Graph}>
                            <Bar
                                data={furnitureGraphData}
                                options={options}
                            />
                            <p>가장 오래 본 가구 (초)</p> 
                        </div>
                        <div className={styles.Graph}>
                            <Bar
                                data={colorGraphData}
                                options={options}
                            />
                            <p>가장 오래 본 컬러 (초)</p> 
                        </div>
                    </div>
                </div>
            </div>
            <Button
                title={"체험 종료"}
                onClick={function(){
                    //1초동안 서서히 어두워진 후
                    nav("/")
                }}
            />
        </div>
    );
  }
  
  export default TotalAnalyzePage;