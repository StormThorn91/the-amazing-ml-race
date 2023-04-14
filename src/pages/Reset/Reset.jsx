import { doc, updateDoc } from "firebase/firestore"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { db } from "../../config/firebase"

export function Reset() {
    const HINTID_1 = '2fR7ZGhgfglyXhXkZdgo'
    const HINTID_2 = 'VkGZAoioIFIYJeY7MzaQ'
    const TOWERID_1 = 'IuZed142hpyupiZEeCHk'
    const TOWERID_2 = 'jYANB1FoHOsBXthd3NtO'
    const ENDGAMEID = '2wwVq0fjumkoMKUu9afq'

    const navigate = useNavigate();

    const handleReset = async () => {
        try {
            const towers1 = doc(db, 'towers', TOWERID_1);
            const towers2 = doc(db, 'towers', TOWERID_2);
            const hints1 = doc(db, 'hints', HINTID_1);
            const hints2 = doc(db, 'hints', HINTID_2);
            const endGame = doc(db, 'gameover', ENDGAMEID);

            await updateDoc(towers1, { redTowers: [true, true, true, true, true, true] });
            await updateDoc(towers2, { blueTowers: [true, true, true, true, true, true] });
            await updateDoc(hints1, { redHintsPhase: [false, false, false] });
            await updateDoc(hints2, { blueHintsPhase: [false, false, false] });
            await updateDoc(endGame, { endGame: false });
            navigate('/login');
        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        handleReset();
    },[])

    return (
        <div></div>
    )
}