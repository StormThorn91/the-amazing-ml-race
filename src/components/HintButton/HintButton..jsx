import style from './style.module.css';

import hint1_enabled from '../../assets/images/hint1_enabled.png';
import hint1_disabled from '../../assets/images/hint1_disabled.png';
import hint2_enabled from '../../assets/images/hint2_enabled.png';
import hint2_disabled from '../../assets/images/hint2_disabled.png';
import hint3_enabled from '../../assets/images/hint3_enabled.png';
import hint3_disabled from '../../assets/images/hint3_disabled.png';
import { useEffect, useState } from 'react';

export function HintButton({ enabled, hintPhrase, hintIndex }) {
    var hint;

    const [showHint, setShowHint] = useState(false);

    if(hintIndex === 0) {
        hint = enabled ? hint1_enabled : hint1_disabled;
    }
    else if(hintIndex === 1) {
        hint = enabled ? hint2_enabled : hint2_disabled;
    }
    else {
        hint = enabled ? hint3_enabled : hint3_disabled;
    }

    useEffect (() => {
        setShowHint(false);
    },[enabled === false])

    const handleOnClick = () =>{
        setShowHint(true);
    }

    return (
        <div className={style.container} onClick={enabled ? handleOnClick : null}>
            {
                showHint ? 
                <div className={style.hint_container}>
                    <p>{hintPhrase}</p>
                </div> :
                <img className={style.btn_logo} src={hint} />
            }
            
        </div>
    )
}