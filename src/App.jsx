import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "./config/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setRole, setUsers } from "./store/Users/users-slice";

import style from './style.module.css'

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const usersList = useSelector((store) => store.usersSlice.users);

  const usersCollectionRef = collection(db, 'users');

  const [isLoading, setLoading] = useState(false);

  const loader = (
    <div className={isLoading ? style.loader_container : style.loader_hide}>
        <div className={style.spinner}></div>
    </div>
)


  const checkAuth = async () => {
    const currentLoggedIn = auth.currentUser;
    if(currentLoggedIn === null) {
       navigate('/login');
    }

    else if(auth.currentUser.email !== null) {
      const split = auth.currentUser.email.split('@');
      const username = split[0].toUpperCase();

      usersList.map((user) => {
        if (user.userId === username && user.role === 'player') {
          navigate('/game');
      }
      if (user.userId === username && (user.role === 'redAdmin' | user.role === 'blueAdmin')) {
          dispatch(setRole(user.role));
          navigate('/admin');
      }
      });
    }
  }

  const getUsers = async () => {
    try {
      const data = await getDocs(usersCollectionRef); 
      const users = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      dispatch(setUsers(users));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect (() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [location.pathname])

  useEffect(() => {
    getUsers();
    checkAuth();
    console.log(auth);
    console.log(location.pathname);
  },[auth.currentUser]);

  return (
    <div className="App">
      {location.pathname === '/login' ? loader : null}
    {
      isLoading && location.pathname === '/login' ? null :
      <Outlet />
    }
      
    </div>
  );
}

export default App;
