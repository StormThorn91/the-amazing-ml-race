import style from './style.module.css'
import mlLogo from '../../assets/images/ML-Logo.png';
import { NavigationButton } from '../../components/NavigationButton/NavigationButton';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Power } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux';
import { setTowers } from '../../store/Towers/tower-slice';

export function User(props) {
    var redEndGame = false;
    var blueEndGame = false;
    const ENDGAMEID = '2wwVq0fjumkoMKUu9afq';

    const [redTowers, setRedTowers] = useState([]);
    const [blueTowers, setBlueTowers] = useState([]);
    const [isEndGame, setEndGame] = useState(false);
    const [gameStanding, setGameStanding] = useState('DEFEAT');
    const [enablePuzzleButton, setEnablePuzzleButton] = useState(false);
    const user = useSelector((store) => store.usersSlice.user);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const towersCollectionRef = collection(db, 'towers');
    const endGameCollectionsRef = collection(db, 'gameover');

    const endGame = (
        <div className={isEndGame ? style.endgame_container : style.endgame_hide}>
            <div className={`${style.endgame_text} ${gameStanding === 'VICTORY' ? style.victory : style.defeat}`}>{gameStanding}</div>
        </div>
    )

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login')
        } catch (err) {
            console.log(err);
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
                }

                else {
                    setEndGame(false);
                }

                if(endList[0].winner === user) {
                    setGameStanding('VICTORY');
                }
    
                else {
                    setGameStanding('DEFEAT');
                }

            });
        } catch (err) {
            console.log(err)
        }
    }

    const updateEndGame = async (gameWinner, id, status) => {
        try {
            const stats = doc(db, 'gameover', id);
            await updateDoc(stats, {endGame: status, winner: gameWinner});
            getEndGameStatus();
        } catch(err) {
            console.log(err);
        }
    }

    const towersChecker = (towers) => {
        if (towers[0] === false && towers[1] === false && towers[2] === false && towers[3] === false  && towers[4] === false) {
            return true;
        }

        else {
            return false;
        }
    }

    const allTowersChecker = (towers) => {
        return towers.every(tower => tower === false);
    }


    const getTowers = async () => {
        try {
            onSnapshot(towersCollectionRef, (querySnapshot) => {
                const towerList = [];
                querySnapshot.forEach((doc) => {
                    towerList.push({
                        ...doc.data(),
                        id: doc.id,
                    });
                });

                setRedTowers(towerList[0].redTowers);
                setBlueTowers(towerList[1].blueTowers);

                if(user === 'R3DT34M') {
                    dispatch(setTowers(towerList[1].blueTowers));
                    setEnablePuzzleButton(towersChecker(towerList[1].blueTowers));
                }
                else {
                    dispatch(setTowers(towerList[0].redTowers));
                    setEnablePuzzleButton(towersChecker(towerList[0].redTowers));
                }

                redEndGame = allTowersChecker(towerList[1].blueTowers);
                blueEndGame = allTowersChecker(towerList[0].redTowers);

                if(redEndGame || blueEndGame) {
                    if(redEndGame) {
                        updateEndGame('R3DT34M', ENDGAMEID, true);
                    }

                    else {
                        updateEndGame('BL00T34M', ENDGAMEID, true)
                    }
                    setEndGame(true)
                }

                else {
                    updateEndGame(user, ENDGAMEID, false);
                }
                
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getEndGameStatus();
        getTowers();
    }, []);

    console.log(gameStanding);

    const mobaMap =
        <svg width="357" height="312" viewBox="0 0 357 312" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <path d="M 32 141.500 C 32 201.725, 32.221 251, 32.492 251 C 32.762 251, 54.250 233.408, 80.242 211.906 C 163.783 142.797, 188.526 122.336, 239 80.629 C 266.225 58.132, 290.525 37.990, 293 35.869 L 297.500 32.013 164.750 32.006 L 32 32 32 141.500 M 221.500 146.031 C 164.850 192.868, 105.340 242.060, 89.255 255.345 L 60.011 279.500 192.168 279.754 C 264.855 279.893, 324.480 279.854, 324.667 279.666 C 324.855 279.478, 324.894 230.173, 324.754 170.098 L 324.500 60.872 221.500 146.031" stroke="none" fill="#548434" fillRule="evenodd" /><path d="M -0 156.003 L -0 312.005 178.750 311.753 L 357.500 311.500 357.753 155.750 L 358.006 0 179.003 0 L 0 0 -0 156.003 M 0.488 156.500 C 0.488 242.300, 0.606 277.252, 0.750 234.171 C 0.894 191.091, 0.894 120.891, 0.750 78.171 C 0.606 35.452, 0.488 70.700, 0.488 156.500 M 32 141.500 C 32 201.725, 32.221 251, 32.492 251 C 32.762 251, 54.250 233.408, 80.242 211.906 C 163.783 142.797, 188.526 122.336, 239 80.629 C 266.225 58.132, 290.525 37.990, 293 35.869 L 297.500 32.013 164.750 32.006 L 32 32 32 141.500 M 221.500 146.031 C 164.850 192.868, 105.340 242.060, 89.255 255.345 L 60.011 279.500 192.168 279.754 C 264.855 279.893, 324.480 279.854, 324.667 279.666 C 324.855 279.478, 324.894 230.173, 324.754 170.098 L 324.500 60.872 221.500 146.031" stroke="none" fill="#fbe39b" fillRule="evenodd" />
            <circle id='tower_6_blue' cx="28.5" cy="285.5" r="25.5" fill={blueTowers[5] ? "#3B88C0" : null} stroke={blueTowers[5] ? null : "#3B88C0"} />
            <circle id='tower_6_red' cx="327.5" cy="28.5" r="25.5" fill={redTowers[5] ? "#C03B3B" : null} stroke={redTowers[5] ? null : "#C03B3B"} />
            <circle id='tower_4_blue' cx="16" cy="156" r="13" fill={blueTowers[3] ? "#3B88C0" : null} stroke={blueTowers[3] ? null : "#3B88C0"} />
            <circle id='tower_1_blue' cx="16" cy="51" r="13" fill={blueTowers[0] ? "#3B88C0" : null} stroke={blueTowers[0] ? null : "#3B88C0"} />
            <circle id='tower_2_blue' cx="143" cy="185" r="13" fill={blueTowers[1] ? "#3B88C0" : null} stroke={blueTowers[1] ? null : "#3B88C0"} />
            <circle id='tower_5_blue' cx="172" cy="295" r="13" fill={blueTowers[4] ? "#3B88C0" : null} stroke={blueTowers[4] ? null : "#3B88C0"} />
            <circle id='tower_3_blue' cx="299" cy="295" r="13" fill={blueTowers[2] ? "#3B88C0" : null} stroke={blueTowers[2] ? null : "#3B88C0"} />
            <circle id='tower_4_red' cx="185" cy="16" r="13" fill={redTowers[3] ? "#C03B3B" : null} stroke={redTowers[3] ? null : "#C03B3B"} />
            <circle id='tower_1_red' cx="51" cy="16" r="13" fill={redTowers[0] ? "#C03B3B" : null} stroke={redTowers[0] ? null : "#C03B3B"} />
            <circle id='tower_2_red' cx="233" cy="113" r="13" fill={redTowers[1] ? "#C03B3B" : null} stroke={redTowers[1] ? null : "#C03B3B"} />
            <circle id='tower_5_red' cx="341" cy="158" r="13" fill={redTowers[4] ? "#C03B3B" : null} stroke={redTowers[4] ? null : "#C03B3B"} />
            <circle id='tower_3_red' cx="341" cy="259" r="13" fill={redTowers[2] ? "#C03B3B" : null} stroke={redTowers[2] ? null : "#C03B3B"} />
            <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_29_3" transform="scale(0.000793058 0.000907441)" />
                </pattern>
            </defs>
        </svg>;
    return (
        <div className={style.container}>
            {isEndGame? endGame : null}
            <img className={style.logo} src={mlLogo} alt="ML Logo" />
            {mobaMap}
            <div className={style.nav}>
            <NavigationButton buttonType={'puzzle'} enabled={enablePuzzleButton}/>
            <NavigationButton buttonType={'hints'} />
            </div>
            <div className={style.logout} onClick={handleLogout}><Power className={style.icon}/></div>
        </div>
    )
}