import React from 'react';
import './Message.css';
import { useSelector } from "react-redux";
import { selectUser } from '../features/userSlice';
import { Avatar } from '@material-ui/core';



const Message = ( id, data )=> {

        const user = useSelector(selectUser);

    return (
        <div className={`message ${user.email === id.data.email && `message__sender`}`}>
           <Avatar src={id.data.photo} className="message__photo" />
           <div className="message__content">
            <p>{id.data.message}</p>
            <small>
                {id.data.timestamp}
            </small> 
           </div>
        </div>
    )

}

export default Message;

// {new Date(timestamp?.toDate())}

// new Date(timestamp?.toDate()).toLocaleDateString()
