import { useSelector } from 'react-redux';
import style from './style.module.css';

export function HintPhaseButton ({ title, adminType, hintClick, hintIndex }) {
    var hintPhaseId = '';

    const hintsPhase = useSelector((store) => store.hintSlice.hintsPhase);

    if(adminType === 'redAdmin') {
        hintPhaseId = '2fR7ZGhgfglyXhXkZdgo';
    }

    else {
        hintPhaseId = 'VkGZAoioIFIYJeY7MzaQ';
    }

    const handleClick = () => {
        hintClick(hintPhaseId, hintIndex, adminType);
    }
    

    return (
        <div className={`${style.container} ${adminType === 'redAdmin' ? style.red : style.blue} ${hintsPhase[hintIndex] ? style.disabled : null }`} onClick={handleClick}>
            <div className={style.text}>{title}</div>
        </div>
    )
}