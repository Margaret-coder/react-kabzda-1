const ADD_MESSAGE = 'ADD-MESSAGE'

 let initialState = {dialogsData : [
    { id: 1, userId: 1, name: "Member 1", image_src: "https://images.pexels.com/photos/905021/pexels-photo-905021.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" },
    { id: 2, userId: 2, name: "Member 2", image_src: "https://images.pexels.com/photos/905021/pexels-photo-905021.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" },
    { id: 3, userId: 3, name: "Member 3", image_src: "https://images.pexels.com/photos/905021/pexels-photo-905021.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" },
    { id: 4, userId: 4, name: "Member 4", image_src: "https://images.pexels.com/photos/905021/pexels-photo-905021.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" },
    { id: 5, userId: 5, name: "Member 5", image_src: "https://images.pexels.com/photos/905021/pexels-photo-905021.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" },
    { id: 6, userId: 6, name: "Member 6", image_src: "https://images.pexels.com/photos/905021/pexels-photo-905021.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" },
  ],
  messagesData : [
    { id: 1, message: "Hello", userId: 0 },
    { id: 2, message: "Yo", userId: 2 },
    { id: 3, message: "Again", userId: 0 },
    { id: 4, message: "But wait", userId: 2 },
    { id: 5, message: "Bye", userId: 0 },
    { id: 6, message: "But wtrtrtrtrait", userId: 2 },
  ],
}

export const addMessageActionCreator = (newMessageText) => ({
  type: ADD_MESSAGE,
  text: newMessageText
})

const dialogsReducer = (state = initialState, action) => {
    switch (action.type){
    case ADD_MESSAGE: {
      debugger
      let stateCopy = {...state}
      stateCopy.messagesData = Array.from(state.messagesData)
      const newMessage = { id: 7, message: action.text, userId: 0 }
      stateCopy.messagesData.push(newMessage)
      return stateCopy
    }
    default: return state
    }
}
export default dialogsReducer  