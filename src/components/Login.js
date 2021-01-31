import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';

const Login = () => {

    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) => alert(error.message));
    };

    return (
        <div className="login">
            <div className="login__telegram">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/1024px-Telegram_logo.svg.png" alt="Telegram-icon" />
                <h1>Telegram</h1>
            </div>
            <Button onClick={signIn}>Sign In With <img className="google__img" src="https://img.utdstc.com/icon/207/754/20775446e3be597100aec56474bea69fc9e64d29e5cb3aa84d93f50462cc108c:200" alt="Google-icon" /></Button>
        </div>
    )
}

export default Login;
