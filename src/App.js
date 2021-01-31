import React, { useEffect } from 'react';
import './App.css';
import Telegram from './components/Telegram';
import { login, logout, selectUser } from './features/userSlice';
import {useSelector, useDispatch} from 'react-redux';
import Login from './components/Login';
import { auth } from './firebase';


function App() {

  // using redux to get user
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        // login 
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return (
    <div className="App">
      {user ? <Telegram /> : <Login />}
    </div>
  );
}

export default App;
