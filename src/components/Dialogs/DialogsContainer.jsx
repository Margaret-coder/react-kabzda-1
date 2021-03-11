import React from 'react'
import { addMessageActionCreator, updateMessageActionCreator } from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'

const DialogsContainer = (props) => {
    let state = props.store.getState().dialogsReducer
    const handleSendMessage = () => {
        props.store.dispatch(addMessageActionCreator())
    }
    const handleUpdateMessage = (text) => {
      props.store.dispatch(updateMessageActionCreator(text))
    }
    return (
        <Dialogs updateNewMessage={handleUpdateMessage}
        sendMessage={handleSendMessage}
        dialogsPage={state}/>
    )
}
export default DialogsContainer