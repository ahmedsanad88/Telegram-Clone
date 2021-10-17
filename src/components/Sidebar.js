import React, { useEffect, useState } from 'react';
import "./Sidebar.css";
import SearchIcon from '@material-ui/icons/Search';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { Avatar, IconButton } from '@material-ui/core';
import SidebarThread from './SidebarThread';
import PhoneIcon from '@material-ui/icons/Phone';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SettingsIcon from '@material-ui/icons/Settings';
import db, { auth } from '../firebase';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';


const Sidebar = () => {

    const user = useSelector(selectUser);
    const [threads, setThreads] = useState([]);




    useEffect(() => {
        db.collection('threads').onSnapshot((snapshot) => setThreads(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))
        ));
    }, []);


    const addThread = () => {
        const threadName = prompt("Enter a thread name?");
        const threadDes = prompt("Enter a thread description?");
        if(threadName) {
            db.collection('threads').add({
                threadName: threadName,
                threadDes: threadDes,
            });
        }
    };

   

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__search">
                    <SearchIcon className="sidebar__searchIcon"/>
                    <input placeholder="search" className="sidebar__input"></input>
                </div>
                <IconButton variant="outlined" id="sidebar__button" data-text="ADD THREAD">
                    <BorderColorIcon className="sidebar__BorderColorIcon" onClick={addThread} />
                </IconButton>
            </div>
            <div className="sidebar__threads">
                {threads.map(({id, data}) => (
                    <SidebarThread key={id} id={id} threadName={data.threadName} threadDes={data.threadDes}/>
                ))}
            </div>
            <div className="sidebar__bottom">
                <Avatar className="sidebar__bottom__avatar" src={user?.photo}/>
                <IconButton>
                    <PhoneIcon />
                </IconButton>
                <IconButton>
                    <QuestionAnswerIcon />
                </IconButton>
                <IconButton>
                    <SettingsIcon />
                </IconButton>
                <IconButton id="exit" data-text="Sign Out">
                    <ExitToAppIcon onClick={() => auth.signOut()} />
                </IconButton>
            </div>
        </div>
    )
}

export default Sidebar;
