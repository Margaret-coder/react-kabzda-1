import { postsAPI} from "../api/postsAPI"
import { profileAPI} from "../api/profileAPI"

const ADD_POST = 'social-network/profile/ADD-POST'
const DELETE_POST = 'social-network/profile/DELETE_POST'
const UPDATE_POST = 'social-network/profile/UPDATE_POST'
const SET_POSTS = 'social-network/profile/SET_POSTS'
const LIKE_POST = 'social-network/profile/LIKE_POST'

let initialState = {
  postsData : [],
  ownerUserId: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type){
      case ADD_POST: {
        console.log('Action content', action.content)
        const postsDataNew = state.postsData.slice()
        postsDataNew.push(action.content)
        console.log('ADD_POST state b4 update:::::', state)
        return {...state, 
          postsData: postsDataNew}
      }
      case LIKE_POST: {
        let stateCopy = {...state}
        var index = stateCopy.postsData.findIndex(item => item._id === action.element._id)
        if(index !== -1){
          console.log('Like post element:::', action.element.likeIds)
          // stateCopy.postsData.splice(index, 1, action.element)
          stateCopy.postsData[index].likeIds = action.element.likeIds
        }
        return stateCopy
      }
      case DELETE_POST: {
        return {...state, 
          postsData: state.postsData.filter
          (item => item._id !== action.element._id)}
      }
      case UPDATE_POST: {
        return state // post value is already in state inside class jsx
      }
      case SET_POSTS: {
        console.log('---------------SET_POSTS', action.posts, action.id)
        return {...state, postsData: action.posts, ownerUserId: action.id}
      }
      default: {
        return state
      }
    }
  }

export const addPostActionCreator = (newPost) => ({
    type: ADD_POST,
    content: newPost
})

export const deletePostActionCreator = (element) => ({
    type: DELETE_POST,
    element
})

export const updatePostActionCreator = (element) => ({
  type: UPDATE_POST,
  element
})

export const likePostActionCreator = (post_data) => ({
  type: LIKE_POST,
  element: post_data
})

export const setPostsData = (posts, id) => ({
    type: SET_POSTS,
    posts: posts,
    id:id
})

export const getProfilePosts = (user_id) => async (dispatch) => {
  console.log('------------------------GET PROFILE POSTS-----------------------------')
  console.log('Request posts by userId', user_id)
  const posts = await postsAPI.requestPostsByUserId(user_id)
  var profiles = await Promise.all(posts.map(async post => {
    return await profileAPI.getProfilePostInfo(post.authorUserId
      )
  }))
  const post_profile = posts.filter(post => {
    var found
    found = profiles.find(profile => profile.userId === post.authorUserId)
    if(found) { 
      post.fullname = found.fullname
      post.avaPath = found.avaPath
      return post 
    }
    else {
      console.log('Not found post:', post)
      return false
    }
  })
  // return post_profile
  dispatch(setPostsData(post_profile, user_id))
}

export const deletePost = (id) => async (dispatch) => {
  const response = await postsAPI.deletePost(id)
  dispatch(deletePostActionCreator(response.data))
}

export const editPost = (post) => async (dispatch) => {
  const response = await postsAPI.editPost(post)
  console.log('POST AUTHOR ID', post.authorUserId)
  dispatch(updatePostActionCreator(response.data)) // updatePostActionCreator is not needed 
}

export const likePost = (post_id) => async (dispatch) => {
  console.log('POSTS REDUCER LIKE POST')
  const response = await postsAPI.likePost(post_id)
  console.log('Response like post', response)
 dispatch(likePostActionCreator(response.data))
}

export const sendNewPost = (message = "message", ownerPageUId) => async (dispatch) => {
  console.log('sendNewPost owner USER ID', ownerPageUId)
  const response = await postsAPI.sendNewPost(message, ownerPageUId)
  console.log('response sendNewPost', response.data)
  dispatch(addPostActionCreator(response.data))
  dispatch(getProfilePosts(ownerPageUId))
}

export default profileReducer