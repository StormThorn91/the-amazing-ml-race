import { useNavigate } from 'react-router-dom';
import style from './style.module.css';

export function Hint (props) {
    const navigate = useNavigate();
    return(
        <div>
            <h1>In HINT page</h1>
            <button onClick={() => navigate('/game')}>Go Back</button>
        </div>
    )
}