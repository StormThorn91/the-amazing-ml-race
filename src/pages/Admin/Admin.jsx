import { useSelector } from 'react-redux';
import style from './style.module.css';
import { auth, db } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { TowerButton } from '../../components/TowerButton/TowerButton';
import { HintButton } from '../../components/HintButton/HintButton';
import { Power } from 'react-bootstrap-icons'

export function Admin(props) {
    var role = '';

    const userRole = useSelector((store) => store.usersSlice.role);
    const navigate = useNavigate();
    const [towers, setTowers] = useState([]);

    const towersCollectionRef = collection(db, 'towers');

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
                    setTowers(towersFetched[0].redTowers);
                }
                else {
                    setTowers(towersFetched[1].blueTowers);
                }
            });    
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getTowers();
        console.log(towers);
    },[])

    const handleClick = async (id, towerState, towerType) => {
        towers[towerState] = false;
        try {
            const towerDoc = doc(db, "towers", id);
            if(towerType === 'redAdmin') {
                await updateDoc(towerDoc, {redTowers: towers })
            }

            else {
                await updateDoc(towerDoc, {blueTowers: towers }) 
            }
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
                <TowerButton towerClick={handleClick} towerIndex={0} adminType={role} title="Tower 1"/>
                <TowerButton towerClick={handleClick} towerIndex={1} adminType={role} title="Tower 2"/>
                <TowerButton towerClick={handleClick} towerIndex={2} adminType={role} title="Tower 3"/>
                <TowerButton towerClick={handleClick} towerIndex={3} adminType={role} title="Tower 4"/>
                <TowerButton towerClick={handleClick} towerIndex={4} adminType={role} title="Tower 5"/>
            </div>
            <div className={style.hint_container}>
                <HintButton userType="admin" title="Enable Hint 1" adminType={role}/>
                <HintButton userType="admin" title="Enable Hint 2" adminType={role} />
                <HintButton userType="admin" title="Enable Hint 3" adminType={role} />
            </div>
            <button className={style.logout} onClick={handleLogout}><Power className={style.icon} /></button>
        </div>
    )
}