import { NavLink } from 'react-router-dom'
import DialogItem from './DialogItem/DialogItem'
import s from './Dialogs.module.css'
import Message from './Message/Message'

const Dialogs = (props) => {
    //debugger
    let dialogsElements = props.dialogsPage.dialogsData.map(dialog => 
        <DialogItem key={dialog.id} name={dialog.name} userId={dialog.userId} image_src={dialog.image_src} id={dialog.id}/>)

    let messageElements = props.dialogsPage.messagesData.map(message => 
        <Message key = {message.id} message={message.message} userId={message.userId} id={message.id}/>)

    return(
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}<div className="circle"></div>
            </div>
            <div className={s.messages}>
                {messageElements}
            </div>
        </div>
    )
}
export default Dialogs