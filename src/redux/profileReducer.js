const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT ='UPDATE-NEW-POST-TEXT'

let initialState = {postsData : [
  { id: 1, message: "Hello", likesCount: 12 },
  { id: 2, message: "Yo", likesCount: 24 },
  { id: 3, message: "Again", likesCount: 2 },
  { id: 4, message: "But wait", likesCount: 0 },
  { id: 5, message: "Bye", likesCount: 18 },
  { id: 6, message: "But wtrtrtrtrait", likesCount: 3 },
  { id: 7, message: "Bili Bili Bili bli", likesCount: 2 },
  { id: 8, message: "Pokurit ne naydetsa", likesCount: 4 },
  { id: 9, message: "It's my life, now and ever", likesCount: 8 },
  { id: 10, message: "Hello", likesCount: 1 },
],
newPostText: ''
}

export const addPostActionCreator = () => ({
    type: ADD_POST,
    userId: 11
  })
  
  export const updatePostActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    text: text
  })
const profileReducer = (state = initialState, action) => {
       switch (action.type){
       case ADD_POST: {
         console.log("state",state)
              const newPost = { id: 11, message: state.newPostText, likesCount: 0 }
              state.postsData.push(newPost)
              state.newPostText = ''
              return state
        }
        case UPDATE_NEW_POST_TEXT: {
              state.newPostText = action.text
              return state
        }
        default: {
          return state}
    }
}
export default profileReducer