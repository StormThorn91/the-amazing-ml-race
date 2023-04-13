import { useDispatch, useSelector } from 'react-redux';
import style from './style.module.css';
import { auth, db } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { TowerButton } from '../../components/TowerButton/TowerButton';
import { HintPhaseButton } from '../../components/HintPhaseButton/HintPhaseButton';
import { Power } from 'react-bootstrap-icons'
import { setTowers } from '../../store/Towers/tower-slice';
import { setHintsPhase } from '../../store/Hints/hint-slice';

export function Admin(props) {
    var role = '';

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const towers = useSelector((store) => store.towerSlice.towers);
    const userRole = useSelector((store) => store.usersSlice.role);
    const hintsPhase = useSelector((store) => store.hintSlice.hintsPhase);


    const towersCollectionRef = collection(db, 'towers');
    const hintsCollectionRef = collection(db, 'hints');

    const getTowers = async () => {
        try {
            onSnapshot(towersCollectionRef, (querySnapshot) => {
                const towersFetched = [];
                querySnapshot.forEach((doc) => {
                    towersFetched.push({
                        ...doc.data(),
                        id: doc.id,
                    });
                });
                if(role === 'redAdmin') {
                    dispatch(setTowers(towersFetched[1].blueTowers));
                }
                else {
                    dispatch(setTowers(towersFetched[0].redTowers));
                }
            });    
        }
        catch (err) {
            console.log(err);
        }
    }

    const getHintsPhase = async () => {
        try {
            onSnapshot(hintsCollectionRef, (querySnapshot) => {
                const hintsFetched = [];
                querySnapshot.forEach((doc) => {
                    hintsFetched.push({
                        ...doc.data(),
                        id: doc.id,
                    });
                });
                if(role === 'redAdmin') {
                    dispatch(setHintsPhase(hintsFetched[0].redHintsPhase));
                }
                else {
                    dispatch(setHintsPhase(hintsFetched[1].blueHintsPhase));
                }
            });    
        }
        catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        getTowers();
        getHintsPhase();
    },[])

    const handleClickTower = async (id, towerState, towerType) => {
        var newTowers = [];
        towers.forEach((tower) => newTowers.push(tower));
        newTowers[towerState] = false;
        dispatch(setTowers(newTowers));
        try {
            const towerDoc = doc(db, "towers", id);
            if(towerType === 'redAdmin') {
                await updateDoc(towerDoc, {blueTowers: newTowers })
            }

            else {
                await updateDoc(towerDoc, {redTowers: newTowers }) 
            }
            getTowers();
          } catch (err) {
            console.log(err);
          }
    }

    const handleClickHint = async (id, hintState, hintType) => {
        var newHintsPhase = [];
        hintsPhase.forEach((hintPhase) => newHintsPhase.push(hintPhase));
        newHintsPhase[hintState] = true;
        dispatch(setHintsPhase(newHintsPhase));
        try {
            const hintPhaseDoc = doc(db, "hints", id);
            if(hintType === 'redAdmin') {
                await updateDoc(hintPhaseDoc, {redHintsPhase: newHintsPhase })           
            }

            else {
                await updateDoc(hintPhaseDoc, {blueHintsPhase: newHintsPhase }) 
            }
            getHintsPhase();
          } catch (err) {
            console.log(err);
          }
    }

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log(towers);
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }


    if (userRole === 'redAdmin') {
        role = 'redAdmin'
    }

    else {
        role = 'blueAdmin'
    }


    return (
        <div className={style.container}>
            <div className={style.title}>
                <h2 className={role === 'redAdmin' ? null : style.team}>Team</h2>
                <h1 className={role === 'redAdmin' ? style.red : style.blue}>
                    {
                        role === 'redAdmin' ? 'RED' : 'BLUE'
                    }
                </h1>
            </div>
            <div>
                <TowerButton towerClick={handleClickTower} towerIndex={0} adminType={role} title="Tower 1"/>
                <TowerButton towerClick={handleClickTower} towerIndex={1} adminType={role} title="Tower 2"/>
                <TowerButton towerClick={handleClickTower} towerIndex={2} adminType={role} title="Tower 3"/>
                <TowerButton towerClick={handleClickTower} towerIndex={3} adminType={role} title="Tower 4"/>
                <TowerButton towerClick={handleClickTower} towerIndex={4} adminType={role} title="Tower 5"/>
            </div>
            <div className={style.hint_container}>
                <HintPhaseButton hintClick={handleClickHint} hintIndex={0} title="Enable Hint 1" adminType={role}/>
                <HintPhaseButton hintClick={handleClickHint} hintIndex={1} title="Enable Hint 2" adminType={role} />
                <HintPhaseButton hintClick={handleClickHint} hintIndex={2} title="Enable Hint 3" adminType={role} />
            </div>
            <div className={style.logout} onClick={handleLogout}><Power className={style.icon} /></div>
        </div>
    )
}