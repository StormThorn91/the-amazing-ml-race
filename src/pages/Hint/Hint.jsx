import { useNavigate } from 'react-router-dom';
import style from './style.module.css';
import { collection, onSnapshot } from 'firebase/firestore';
import { setHints } from '../../store/Hints/hint-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { HintButton } from '../../components/HintButton/HintButton.';
import { db } from '../../config/firebase';
import { X as Close } from 'react-bootstrap-icons'

export function Hint(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const hints = useSelector((store) => store.hintSlice.hints);
    const user = useSelector((store) => store.usersSlice.user);
    const [hintsPhase, setHintPhase] = useState([]);

    const hintsCollectionRef = collection(db, 'hints');

    const getHints = () => {
        try {
            onSnapshot(hintsCollectionRef, (querySnapshot) => {
                const hintsFetched = [];
                querySnapshot.forEach((doc) => {
                    hintsFetched.push({
                        ...doc.data(),
                        id: doc.id,
                    });
                });
                if (user === 'R3DT34M') {
                    dispatch(setHints(hintsFetched[0].redHints));
                    setHintPhase(hintsFetched[0].redHintsPhase)
                }
                else {
                    dispatch(setHints(hintsFetched[1].blueHints));
                    setHintPhase(hintsFetched[1].blueHintsPhase)
                }
                console.log(hints);
                console.log(hintsPhase);
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getHints();
    }, [])

    return (
        <div className={style.container}>
            <div className={style.button_container}>
                {
                    hints.map((hint, index) => (
                        <div>
                            <HintButton key={index} enabled={hintsPhase[index]} hintPhrase={hint} hintIndex={index} />
                        </div>
                    ))
                }
            </div>
            <div className={style.close_container} onClick={() => navigate('/game')}>
                    <Close className={style.close_btn} />
                </div>
        </div>
    )
}