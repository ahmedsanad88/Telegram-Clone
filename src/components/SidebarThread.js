import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { setThread, selectThreadId } from '../features/threadSlice';
import db from '../firebase';
import "./SidebarThread.css";


const SidebarThread = ({id, threadName, threadDes}) => {

    const dispatch = useDispatch();
    const threadId = useSelector(selectThreadId);

    const [threadInfo, setThreadInfo] = useState([]);

    // console.log(threadInfo);

    useEffect(() => {
        if (threadId)
        db.collection('threads').doc(threadId).collection('messages').orderBy('timestamp', 'desc').onSnapshot((snapshot) => setThreadInfo(snapshot.docs.map((doc) => doc.data()))
        );
        
        return (console.log('hello World'));
    }, [threadId]);

    const [seed, setSeed] = useState('');

        useEffect(() => {
            setSeed(Math.floor(Math.random() * 5000));
        }, []);
        
    return (
        <div className="sidebarThread" onClick={() => dispatch(setThread({
            threadId: id,
            threadName: threadName,
            threadDes: threadDes,
        }))}>
            <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
            <div className="sidebarThread__details">
                <h3>{threadName}</h3>
                <p>
                    { threadDes }
                </p>
                <small className="sidebarThread__timeStamp">
                    {new Date().toDateString()}
                </small>
            </div>
        </div>
    )
}

export default SidebarThread;
