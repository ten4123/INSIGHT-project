import React from 'react';

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

import styles from './Card.module.css'

chartjs.register(
    LineElement,
    BarElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);


function PersonalCard(props) {

    const data = {
        labels: props.labels,
        datasets: [{
            labels: '스타일',
            data: props.count,
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
                        size: 24,
                        weight: "bold"
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
        <div className={styles.Card} onClick={props.onClick}>
            <h3 className={styles.h3}>{props.title}</h3>
            <div className={styles.Chart}>
                <Bar
                    data={data}
                    options={options}
                />
            </div>
        </div>
    );
  }
  
  export default PersonalCard