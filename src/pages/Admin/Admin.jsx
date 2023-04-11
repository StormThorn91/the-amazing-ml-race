import { useSelector } from 'react-redux';
import style from './style.module.css';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export function Admin (props) {
    const userRole = useSelector((store) => store.usersSlice.role);
    var role = '';
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
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
                <h2>Team</h2>
                <h1 className={role === 'redAdmin' ? style.red : style.blue}>
                    {
                        role === 'redAdmin' ? 'RED' : 'BLUE'
                    }
                </h1>
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}