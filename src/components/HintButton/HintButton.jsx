import style from './style.module.css';

export function HintButton ({userType, title, adminType}) {
    return (
        <div className={`${style.container} ${adminType === 'redAdmin' ? style.red : style.blue}`}>
            {
                userType === 'admin' ?
                <div className={style.text}>{title}</div> :
                <div>USER</div>
            }
        </div>
    )
}