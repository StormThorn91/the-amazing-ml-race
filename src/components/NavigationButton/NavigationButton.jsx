import { useNavigate } from 'react-router-dom';
import style from './style.module.css';
import { QuestionLg, LockFill } from 'react-bootstrap-icons'

export function NavigationButton({ buttonType, enabled }) {
    const navigate = useNavigate();
    
    const handleClick = () => {
        if (buttonType === 'puzzle') {
            navigate("/puzzle")
        }

        else {
            navigate('/hints')
        }
    }
    return (
        <div className={style.container}>
            <div className={`${style.button} ${buttonType === 'puzzle' ? enabled ? null : style.button_disabled : null}`} onClick={buttonType === 'puzzle' ? enabled ? handleClick : null : handleClick}>{buttonType === 'puzzle' ? <LockFill className={style.icon}/> : <QuestionLg className={style.icon} />}</div>
        </div>
    );
}