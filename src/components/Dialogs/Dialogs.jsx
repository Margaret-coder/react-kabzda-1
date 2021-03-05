import DialogItem from './DialogItem/DialogItem'
import s from './Dialogs.module.css'
import Message from './Message/Message'
import React from 'react'

const Dialogs = (props) => {
    let dialogsElements = props.dialogsPage.dialogsData.map(dialog =>
        <DialogItem key={dialog.id} name={dialog.name} userId={dialog.userId} image_src={dialog.image_src} id={dialog.id} />)

    let messageElements = props.dialogsPage.messagesData.map(message =>
        <Message key={message.id} message={message.message} userId={message.userId} id={message.id} />)
    let newMessageText = props.dialogsPage.newMessageText
        let referenceMessage = React.createRef()
    const sendMessage = () => {
        const text = referenceMessage.current.value
        props.store.addMessage(text)
        referenceMessage.current.value = ""
        props.dialogsPage.newMessageText = ""
    }
    const handleUpdateMessage = () => {
        const text = referenceMessage.current.value
        props.store.updateMessage(text)
        console.log(newMessageText)
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
                <textarea onChange={handleUpdateMessage} value={newMessageText} ref={referenceMessage}></textarea>
                <button className={s.btn} onClick={sendMessage}>Send message</button>
            </div>
        </div>
    )
}
export default Dialogs