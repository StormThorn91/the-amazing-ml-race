import { useLocation, useNavigate } from 'react-router-dom';
import style from './style.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormState } from '../../store/FormState/formstate-slice';
import mlLogo from '../../assets/images/ML-Logo.png';
import lockLogo from '../../assets/images/locked.png';
import { X as Close } from 'react-bootstrap-icons'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { setRole, setUser } from '../../store/Users/users-slice';

export function Form(props) {
    const PREFIX = '@gmail.com';
    const PASS = 'Pass1word'
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const path = useSelector((store) => store.formStateSlice.formState);
    const usersList = useSelector((store) => store.usersSlice.users);
    const [userInput, setUserInput] = useState("");

    const userAndRoleSetter = (user, role) => {
        dispatch(setUser(user));
        dispatch(setRole(role));
    }

    const handleLoginButton = async () => {
        try {
            await signInWithEmailAndPassword(auth, userInput + PREFIX, PASS);
            const email = auth.currentUser.email.split('@');
            const username = email[0].toUpperCase();
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

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        // handleLogout();
        if (location.pathname === '/login') {
            dispatch(setFormState('login'));
        }

        else {
            dispatch(setFormState('puzzle'));
        }
    })
    return (
        <div className={style.container}>
            <div className={style.logo_container}>
                <img src={path === 'login' ? mlLogo : lockLogo} className={path === 'login' ? style.login_logo : style.puzzle_logo} alt='logo' />
            </div>
            <div className={style.form_container}>
                <label className={style.form_label}>
                    {
                        path === 'login' ? 'Enter Login code:' : 'Enter Puzzle Code:'
                    }
                </label>
                <input type="text" className={style.form_input} onChange={(e) => setUserInput(e.target.value)} />
                <button className={style.submit_btn} onClick={path === 'login' ? handleLoginButton : null}>SUBMIT</button>
            </div>
            {
                path === 'login' ? null :
                    <div>
                        <Close className={style.close_btn} />
                    </div>
            }

        </div>
    )
}