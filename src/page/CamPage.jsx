import React, { useState, useEffect, useRef , useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '../ui/Button';
import Tile from '../ui/tile';
import MainCard from '../ui/MainCard';
import AnalyzingCard from '../ui/AnalyzingCard';

import GenderAgeContext from './GenderAgeContext';

import styles from './page.module.css';

import $ from 'jquery';

function CamPage() {

    const nav = useNavigate();

    const webgazer = window.webgazer;

    const { gender, age, countData, setCountData } = useContext(GenderAgeContext);

    const [showAnalyzing, setShowAnalyzing] = useState(false);
    const [addMoveClass, setAddMoveClass] = useState(false);
    const [addOpacityClass, setAddOpacityClass] = useState(false);
    const [addZindexClass, setAddZindexClass] = useState(false);
    const [imageIndex, setImageIndex] = useState(1);

    // 각 이미지마다 가구 영역 설정
    let boxData = {
        boxes: [
            { image: 1,     id: 'f1-1',   top: 480+552/2,    left: 840+496/2,        width: 552,     height: 496},
            { image: 1,     id: 'f1-2',   top: 640+416/2,    left: 1400+324/2,       width: 324,     height: 416},
            { image: 1,     id: 'f1-3',   top: 1060+380/2,    left: 876+900/2,        width: 900,     height: 380},
            { image: 2,     id: 'f2-1',   top: 420+400/2,    left: 850+532/2,        width: 532,     height: 400},
            { image: 2,     id: 'f2-2',   top: 832+700/2,    left: 844+400/2,        width: 700,     height: 400},
            { image: 2,     id: 'f2-3',   top: 768+444/2,    left: 1600+400/2,       width: 400,     height: 444},
            { image: 3,     id: 'f3-1',   top: 364+384/2,    left: 934+684/2,       width: 684,     height: 384},
            { image: 3,     id: 'f3-2',   top: 748+426/2,    left: 934+684/2,        width: 684,     height: 426},
            { image: 3,     id: 'f3-3',   top: 500+560/2,    left: 1632+260/2,        width: 260,     height: 560},
            { image: 4,     id: 'f4-1',   top: 50+500/2,    left: 1204+386/2,        width: 386,     height: 500},
            { image: 4,     id: 'f4-2',   top: 720+440/2,    left: 976+880/2,        width: 880,     height: 440},
            { image: 4,     id: 'f4-3',   top: 326+380/2,    left: 1692+270/2,       width: 270,     height: 380},
            { image: 5,     id: 'f5-1',   top: 750+228/2,    left: 664+1130/2,        width: 1130,     height: 228},
            { image: 5,     id: 'f5-2',   top: 978+400/2,    left: 857+602/2,        width: 602,     height: 400},
            { image: 5,     id: 'f5-3',   top: 978+250/2,    left: 1540+280/2,        width: 280,     height: 250},
            { image: 6,     id: 'f6-1',   top: 370+690/2,    left: 560+228/2,        width: 228,     height: 690},
            { image: 6,     id: 'f6-2',   top: 690+280/2,    left: 790+1000/2,        width: 1000,     height: 280},
            { image: 6,     id: 'f6-3',   top: 970+270/2,    left: 850+420/2,       width: 420,     height: 270},
        ]

    }

    webgazer.showPredictionPoints(true); // 포인터 활성화/비활성화
    webgazer.showFaceOverlay(false); // 얼굴 오버레이 활성화/비활성화

    // 웹게이저 실행
    useEffect(() => {
        webgazer.setGazeListener(() => {}).begin();
    }, []); 

    // 아이트래킹 박스 생성
    useEffect(() => {

        // 이전에 생성된 박스가 있으면 제거
        const removeBoxes = () => {
            $('.box').remove();
        };

        // 새로운 박스 정의
        const createBox = (_id, _t, _l, _w, _h) => {
            let _box = $('<div></div>');
            _box.addClass('box');
            _box.prop('id', _id);
            _box.css('position', 'absolute');
            _box.css('top', `${_t}px`);
            _box.css('left', `${_l}px`);
            _box.css('transform', 'translate(-50%, -50%)');
            _box.css('width', `${_w}px`);
            _box.css('height', `${_h}px`);
            _box.css('border', `2px solid red`);
            _box.css('zIndex', `-1`);
            $('body').append(_box)
        }

        removeBoxes();

        for(let i in boxData.boxes){
            let _box = boxData.boxes[i];
            if(_box.image === imageIndex){
                createBox(_box.id, _box.top, _box.left, _box.width, _box.height);
            }
        }
        
    }, [imageIndex]);
    
    //타일 투명도에 따라 기능 실행
    const initialTileTransparency = 1;
    const [tileTransparencies, setTileTransparencies] = useState(Array(9).fill(initialTileTransparency));

    const handleTileClick = (tileIndex) => {
        if (tileTransparencies[tileIndex] > 0) {
            setTileTransparencies(prevTransparencies => {
                const newTransparencies = [...prevTransparencies];
                newTransparencies[tileIndex] -= 1 / 6;
                return newTransparencies;
            });
    
            if (tileTransparencies.every(transparency => transparency <= 0.2)) {

                setAddMoveClass(true);
    
                const interval = setInterval(() => {
                    if (imageIndex < 6) {
                        setImageIndex(prevIndex => prevIndex + 1);
                    } else {
                        clearInterval(interval);
                    }
                }, 5000);
    
                setTimeout(() => {

                    setShowAnalyzing(true);

                }, 30000);

                setTimeout(() => {
                    webgazer.end();
                }, 30000);
                
                setTimeout(() => {
                    nav('/3');
                }, 35000);

            }
        }
    };

    //아이캘리브레이션이 끝난 후 카운트 반복
    useEffect(() => {

        if (tileTransparencies.every(transparency => transparency <= 0.2)){

            const intervalId = setInterval(() => {

                webgazer.getCurrentPrediction().then((data) => {
                    const x = data?.x;
                    const y = data?.y;
    
                    console.log(x,y)
        
                    // 각 박스 영역에 대한 작업을 수행하는 함수
                    const performBoxAction = (boxId, styleId, furnitureId, colorId) => {
    
                        const box = boxData.boxes.find(box => (
                            x >= box.left &&
                            x <= box.left + box.width &&
                            y >= box.top &&
                            y <= box.top + box.height &&
                            box.image === imageIndex &&
                            box.id === boxId
                        ));
        
                        if (box) {
                            setCountData(prevCountData => {
                                const newCountData = prevCountData.map(item => {
                                    if (item.class === "style") {
                                        item.counts = item.counts.map(countItem =>
                                            countItem.id === styleId
                                                ? { ...countItem, count: countItem.count + 1 }
                                                : countItem
                                        );
                                    } else if (item.class === "furniture") {
                                        item.counts = item.counts.map(countItem =>
                                            countItem.id === furnitureId
                                                ? { ...countItem, count: countItem.count + 1 }
                                                : countItem
                                        );
                                    } else if (item.class === "color") {
                                        item.counts = item.counts.map(countItem =>
                                            countItem.id === colorId
                                                ? { ...countItem, count: countItem.count + 1 }
                                                : countItem
                                        );
                                    }
                                    return item;
                                });
                                return newCountData;
                            });
    
                            console.log("count+1");
    
                        }
                    };
        
    
                    if(imageIndex === 1){
                        performBoxAction('f1-1', '미니멀' , '액자' , '화이트');
                        performBoxAction('f1-2', '미니멀' , '조명' , '화이트');
                        performBoxAction('f1-3', '빈티지' , '소파' , '브라운');
                    }
                    if(imageIndex === 2){
                        performBoxAction('f2-1', '내추럴' , '식물' , '그린');
                        performBoxAction('f2-2', '미니멀' , '식탁' , '화이트');
                        performBoxAction('f2-3', '모던' , '소파' , '그레이');
                    }
                    if(imageIndex === 3){
                        performBoxAction('f3-1', '클래식' , '조명' , '골드');
                        performBoxAction('f3-2', '빈티지' , '소파' , '브라운');
                        performBoxAction('f3-3', '클래식' , '책장' , '골드');
                    }
                    if(imageIndex === 4){
                        performBoxAction('f4-1', '러블리' , '조명' , '골드');
                        performBoxAction('f4-2', '미니멀' , '액자' , '화이트');
                        performBoxAction('f4-3', '모던' , '의자' , '그레이');
                    }
                    if(imageIndex === 5){
                        performBoxAction('f5-1', '미니멀' , '소파' , '화이트');
                        performBoxAction('f5-2', '클래식' , '의자' , '브라운');
                        performBoxAction('f5-3', '미니멀' , '소파' , '브라운');
                    }
                    if(imageIndex === 6){
                        performBoxAction('f6-1', '미니멀' , '책장' , '블랙');
                        performBoxAction('f6-2', '클래식' , '소파' , '브라운');
                        performBoxAction('f6-3', '미니멀' , '책상' , '블랙');
                    }
                });
            }, 100);
    
            return () => {
                clearInterval(intervalId);
            };

        }

    }, [imageIndex, tileTransparencies]);

    return (
      <div>
        {/* 아이트래킹 페이지 */}
        <div className={styles.EyeTrackingPage} style={addMoveClass ? { zIndex: 10 } : {}}>  
            <div className={`${styles.dimmedBackground} ${showAnalyzing ? styles.visible : ''}`}>
                <AnalyzingCard />
            </div>
            <div className={`${styles.progressBar} ${addMoveClass ? styles.move : ''}`}></div>
            <MainCard
                imageIndex={imageIndex}/>
            {/* 캘리브레이션용 타일 */}
            <div className={styles.Calibration}>
            <div className={styles.tileBox}>
                {Array(9).fill().map((_, index) => (
                    <Tile
                        key={index}
                        number={6}
                        transparency={tileTransparencies[index]}
                        onClick={() => handleTileClick(index)}
                    />
                ))}
            </div>
            </div>
            <div className={`${styles.Alret} ${addOpacityClass ? styles.opacity0 : ''} ${addZindexClass ? styles.Zindex0 : ''}`}>각 타일을 바라보면서 클릭하여 사진이 드러나게 해주세요.<br/>모든 타일을 없애면 다음 사진으로 5초 간격으로 넘어갑니다.</div>
        </div>
        
        {/* 캠 세팅 페이지 */}
        <div className={styles.CamPage}>
            <div className={styles.Cam}>
                <h1 className={styles.h1}>아래 캠 화면을 보면서 얼굴이 영역 안에 얼굴이 들어오게 위치해주세요.</h1>
                <p className={styles.p}>영역 테두리가 초록색으로 변하면 다음 버튼을 눌러 체험을 시작하세요.<br/>30초동안 6장의 인테리어 사진을 구경하기만하면 됩니다.</p>
            </div>        
            <Button 
                title={"다음"}
                opacity={1}
                onClick={function(){
                    const EyeTrackingPageDiv = document.querySelector(`.${styles.EyeTrackingPage}`);
                    if (EyeTrackingPageDiv) {
                        EyeTrackingPageDiv.style.zIndex = '10';
                    }

                    setTimeout(() => {
                        setAddOpacityClass(true);
                    }, 3000);
                    setTimeout(() => {
                        setAddZindexClass(true);
                    }, 4000);

                }}
            />
        </div>
        
      </div>
    );
  }
  
  export default CamPage;