import style from './style.module.css';
import { useSelector } from 'react-redux';
export function TowerButton({ adminType, title, towerIndex, towerClick }) {
    var towerId = '';

    const towers = useSelector((store) => store.towerSlice.towers);

    if(adminType === 'redAdmin') {
        towerId = 'jYANB1FoHOsBXthd3NtO';
    }

    else {
        towerId = 'IuZed142hpyupiZEeCHk';
    }

    const handleClick = () => {
        towerClick(towerId, towerIndex, adminType);
    }

    return (
        <div className={`${style.container} ${adminType === 'redAdmin' ? style.blue : style.red} ${towers[towerIndex] ? null : style.disabled}`} onClick={handleClick}>
            <h3 className={style.buttonText}>{title}</h3>
        </div>
    )
}