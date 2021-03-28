import {Redirect} from 'react-router-dom'
import DialogItem from './DialogItem/DialogItem'
import s from './Dialogs.module.css'
import Message from './Message/Message'
import React from 'react'

const Dialogs = (props) => {
    let state = props.dialogsPage
    let dialogsElements = state.dialogsData.map(dialog =>
        <DialogItem key={dialog.id} name={dialog.name} userId={dialog.userId} image_src={dialog.image_src} id={dialog.id} />)
        let messageElements = state.messagesData.map(message =>
            <Message key={message.id} message={message.message} userId={message.userId} id={message.id} />)
            let newMessageText = state.newMessageText
    const addMessage = () => {
        props.handleSendMessage()
    }
    const updateMessage = (e) => {
        const text = e.target.value
        props.handleUpdateMessage(text)
    }
    
    if(props.isAuth === false){
        return <Redirect to={"/login"}/>
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messageElements}
            </div>
            <div className={s.textarea}>
                <textarea value={newMessageText} 
                onChange={updateMessage}>
                </textarea>
                <button className={s.btn} onClick={addMessage}>Send message</button>
            </div>
        </div>
    )
}
export default Dialogs