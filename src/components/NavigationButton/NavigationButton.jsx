import style from './style.module.css';
import { } from 'react-bootstrap-icons'

export function NavigationButton({ buttonType }) {
    return (
        <div className={buttonType === 'puzzle' ? style.container : style.container_up}>
           <p><i className={`${style.arrow} ${buttonType === 'puzzle' ? style.down : style.up}`}></i></p>
        </div>
    );
}