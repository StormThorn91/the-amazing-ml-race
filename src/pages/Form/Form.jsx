import { useLocation, useNavigate } from 'react-router-dom';
import style from './style.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormState } from '../../store/FormState/formstate-slice';
import mlLogo from '../../assets/images/ML-Logo.png';
import lockLogo from '../../assets/images/locked.png';
import { X as Close } from 'react-bootstrap-icons'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { setRole, setUser } from '../../store/Users/users-slice';
import { collection, doc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
import { setTowers } from '../../store/Towers/tower-slice';

export function Form(props) {
    const PREFIX = '@gmail.com';
    const PASS = 'Pass1word'
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const path = useSelector((store) => store.formStateSlice.formState);
    const usersList = useSelector((store) => store.usersSlice.users);
    const user = useSelector((store) => store.usersSlice.user);
    const towers = useSelector((store) => store.towerSlice.towers);
    const [userInput, setUserInput] = useState("");
    const [puzzleSolved, setPuzzleSolved] = useState("");
    const [id, setId] = useState('');
    const [endGame, setEndGame] = useState(false);
    const [buttonText, setButtonText] = useState('SUBMIT');

    const puzzleAnswerCollectionRef = collection(db, 'finalanswer');
    const endGameCollectionsRef = collection(db, 'gameover');

    const userAndRoleSetter = (user, role) => {
        dispatch(setUser(user));
        dispatch(setRole(role));
    }

    const disableButton = () => {
        if(endGame) {
            return true;
        }
        else {
            return false;
        }
    }

    const getEndGameStatus = async () => {
        try {
            onSnapshot(endGameCollectionsRef, (querySnapshot) => {
                const endList = [];
                querySnapshot.forEach((doc) => {
                    endList.push({
                        ...doc.data(),
                        id: doc.id,
                    });
                });

                if(endList[0].endGame === true) {
                    setEndGame(true);
                    navigate('/game')
                }
                else {
                    setEndGame(false);
                }
            });
        } catch (err) {
            console.log(err)
        }
    }

    const getFinalAnswer = async () => {
        try {
            const data = await getDocs(puzzleAnswerCollectionRef);
            const puzzleAnswer = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))

            if (user === 'R3DT34M') {
                setPuzzleSolved(puzzleAnswer[0].redfinal);
                setId('jYANB1FoHOsBXthd3NtO');
            }

            else {
                setPuzzleSolved(puzzleAnswer[0].bluefinal);
                setId('IuZed142hpyupiZEeCHk');
            }

        } catch (err) {
            console.log(err);
        }
    }

    const handlePuzzleAnswer = async () => {
        if (userInput.toUpperCase() === puzzleSolved) {
            setButtonText('SUBMITTING...')
            var newTowers = [];
            towers.forEach((tower) => newTowers.push(tower));
            newTowers[5] = false;
            dispatch(setTowers(newTowers));
            try {
                const towerDoc = doc(db, "towers", id);
                if (user === 'R3DT34M') {
                    await updateDoc(towerDoc, { blueTowers: newTowers });
                }

                else {
                    await updateDoc(towerDoc, { redTowers: newTowers });
                }
                setButtonText('SUBMIT');
                navigate('/game');
            } catch (err) {
                console.log(err);
            }
        }
    }
    const handleLoginButton = async () => {
        try {
            await signInWithEmailAndPassword(auth, userInput + PREFIX, PASS);
            const email = auth.currentUser.email.split('@');
            const username = email[0].toUpperCase();
            setButtonText('LOGGING YOU IN...');
            usersList.map((user) => {
                if (user.userId === username && user.role === 'player') {
                    userAndRoleSetter(username, user.role);
                    navigate('/game');
                }
                if (user.userId === username && (user.role === 'redAdmin' | user.role === 'blueAdmin')) {
                    userAndRoleSetter(username, user.role);
                    navigate('/admin');
                }
            })
        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        if (location.pathname === '/login') {
            setButtonText('SUBMIT');
            dispatch(setFormState('login'));
        }

        else {
            getFinalAnswer();
            setButtonText('SUBMIT');
            dispatch(setFormState('puzzle'));
            getEndGameStatus();
        }
    }, [])
    return (
        <div className={style.container}>
            <div className={style.logo_container}>
                <img src={path === 'login' ? mlLogo : lockLogo} className={path === 'login' ? style.login_logo : style.puzzle_logo} alt='logo' />
            </div>
            <div className={style.form_container}>
                <label className={style.form_label}>
                    {
                        path === 'login' ? 'Enter Login Code:' : 'Enter Puzzle Answer:'
                    }
                </label>
                <input type="text" className={style.form_input} onChange={(e) => setUserInput(e.target.value)} />
                <button className={style.submit_btn} onClick={path === 'login' ? handleLoginButton : disableButton() ? null : handlePuzzleAnswer}>{buttonText}</button>
            </div>
            {
                path === 'login' ? null :

                    <div onClick={() => navigate('/game')}>
                        <Close className={style.close_btn} />
                    </div>
            }

        </div>
    )
}