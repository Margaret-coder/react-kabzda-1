import {Redirect} from 'react-router-dom'
import DialogItem from './DialogItem/DialogItem'
import s from './Dialogs.module.css'
import Message from './Message/Message'
import React from 'react'
import {Field, reduxForm} from 'redux-form'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { Textarea } from '../Common/FormControls/FormControls'

const maxLength10 = maxLengthCreator(10)

const DialogsForm = (props) => {
    debugger
    return (
        <form onSubmit={props.handleSubmit} className={s.textarea}>
                <div>
                    <Field 
                    component={Textarea}
                    validate={[required, maxLength10]} 
                    placeholder={"Your Message"} 
                    name={"newMessageText"}/>
                </div>
                <div>
                    <button className={s.btn}>Send message</button>
                </div>
        </form>
    )
}

const DialogsReduxForm = reduxForm({form:"dialogs form"})
(DialogsForm)

const Dialogs = (props) => {
    debugger
    let state = props.dialogsPage
    let dialogsElements = state.dialogsData.map(dialog =>
        <DialogItem key={dialog.id} name={dialog.name} userId={dialog.userId} image_src={dialog.image_src} id={dialog.id} />)
        let messageElements = state.messagesData.map(message =>
            <Message key={message.id} message={message.message} userId={message.userId} id={message.id} />)
    const addNewMessage = (values) => {
        props.handleSendMessage(values.newMessageText)
        values.newMessageText = ''
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messageElements}
            </div>
            <DialogsReduxForm onSubmit={addNewMessage}/>
        </div>
    )
}
export default Dialogs