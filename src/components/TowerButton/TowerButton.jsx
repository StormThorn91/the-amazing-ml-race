import { useEffect, useState } from 'react';
import style from './style.module.css';
import { collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
export function TowerButton({ adminType, title, towerIndex, towerClick }) {
    var towerId = '';

    if(adminType === 'redAdmin') {
        towerId = 'IuZed142hpyupiZEeCHk';
    }

    else {
        towerId = 'jYANB1FoHOsBXthd3NtO';
    }

    const handleClick = () => {
        towerClick(towerId, towerIndex, adminType);
    }

    return (
        <div className={`${style.container} ${adminType === 'redAdmin' ? style.red : style.blue}`} onClick={handleClick}>
            <h3 className={style.buttonText}>{title}</h3>
        </div>
    )
}