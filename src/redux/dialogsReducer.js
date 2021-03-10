const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT ='UPDATE-NEW-MESSAGE-TEXT'

export const addMessageActionCreator = () => ({
  type: ADD_MESSAGE,
  userId: 11
})

export const updateMessageActionCreator = (text) => ({
  type: UPDATE_NEW_MESSAGE_TEXT,
  text: text
})

const dialogsReducer = (state, action) => {
    switch (action.type){
    case ADD_MESSAGE: {
      const newMessage = {
        id:7, 
        message:  state.newMessageText, 
        userId: 0}
        state.messagesData.push(newMessage)
      return state
    }
    case UPDATE_NEW_MESSAGE_TEXT: {
      state.newMessageText = action.text
      return state
    }
    default: return state
    }
}
export default dialogsReducer  