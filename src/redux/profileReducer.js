const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT ='UPDATE-NEW-POST-TEXT'

export const addPostActionCreator = () => ({
    type: ADD_POST,
    userId: 11
  })
  
  export const updatePostActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    text: text
  })
const profileReducer = (state, action) => {
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