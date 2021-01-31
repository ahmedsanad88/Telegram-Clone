import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import "./Thread.css";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SendIcon from '@material-ui/icons/Send';
import MicNoneIcon from '@material-ui/icons/MicNone';
import TimerIcon from '@material-ui/icons/Timer';
import db from '../firebase';
import { useSelector } from "react-redux";
import { selectThreadId, selectThreadName, selectThreadDes } from '../features/threadSlice';
import { selectUser } from '../features/userSlice';
import Message from './Message';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SidebarThread from './SidebarThread';





const Thread = () => {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const threadName = useSelector(selectThreadName);
    const threadDes = useSelector(selectThreadDes);
    const threadId = useSelector(selectThreadId);
    const user = useSelector(selectUser);

    // to make sure showing the messages for the same thread 
    useEffect(() => {
        
            const unsubscribeMe = db.collection('threads').doc(threadId ? threadId.toString() : console.log('no threadId')).collection('messages').orderBy('timestamp','desc').onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })))
            );

        return () => {
           unsubscribeMe();  
        }
    },[threadId]);

    // console.log(messages);

    const sendMessage = async (e) => {
        e.preventDefault();

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = date+' '+time;

        
           input && db.collection('threads').doc(threadId).collection('messages').add({
                timestamp: dateTime,
                message: input,
                uid: user.uid,
                photo: user.photo,
                email: user.email,
                displayName: user.displayName,
            });
        
        return (
        setInput('')
        );
    };


    const [seed, setSeed] = useState('');

        useEffect(() => {
            setSeed(Math.floor(Math.random() * 5000));
        }, []);

    return (
        <div className="thread">
            <div className="thread__header">
                <div className="thread__header__contents">
                    {threadId ? <SidebarThread key={threadId} id={threadId} threadName={threadName} threadDes={threadDes}/>
                    :
                    <div className="thread__temHeader">
                        <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
                        <div className="thread__header__contents__info">
                            <h4>Choose Thread</h4>
                            <h5>Which thread want to lunch !!</h5>
                        </div>
                        </div>
                    }
                </div>
                <IconButton className="thread__header__details" >
                    <MoreHorizIcon />
                </IconButton>
            </div>
            <div className="thread__messages">
                {messages.map(({id, data}) => (
                    <Message key={id} data={data} />
                ))}
            </div>
            <div className="thread__input">
                <form>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <input placeholder="Write a message...." type="text" value={input} onChange={(e) => setInput(e.target.value)}></input>
                    <IconButton>
                        <TimerIcon />
                    </IconButton>
                    <IconButton>
                        <EmojiEmotionsIcon />
                    </IconButton>
                    <IconButton onClick={sendMessage} type="submit">
                        <SendIcon />
                    </IconButton>
                    <IconButton>
                        <MicNoneIcon />
                    </IconButton>
                </form>
            </div>
        </div>
    )
}

export default Thread;
