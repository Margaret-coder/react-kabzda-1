import React from 'react'
import { addMessageActionCreator, updateMessageActionCreator } from '../../redux/dialogsReducer'
import StoreContext from '../../redux/StoreContext'
import Dialogs from './Dialogs'

const DialogsContainer = () => {
    return (
        <StoreContext.Consumer>
        {
            (store) => {
                let state = store.getState().dialogsPage
                let handleSendMessage = () => {
                    store.dispatch(addMessageActionCreator())
                }
                let handleUpdateMessage = (text) => {
                    store.dispatch(updateMessageActionCreator(text))
                }
                debugger
                return(
                    <Dialogs updateNewMessage={handleUpdateMessage}
                    sendMessage={handleSendMessage}
                    dialogsPage={state}/>
                )
            }
        }
        </StoreContext.Consumer>
    )
}
export default DialogsContainer