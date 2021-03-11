import React from 'react'
import {addPostActionCreator, updatePostActionCreator} from '../../../redux/profileReducer'
import StoreContext from '../../../redux/StoreContext'
import MyPosts from './MyPosts'

const MyPostsContainer = () => {
    return (
        <StoreContext.Consumer>
        {
            (store) => {
                const handleAddPost = () => {
                    store.dispatch(addPostActionCreator())
                }
                const handleUpdatePost = (text) => {
                    let action = updatePostActionCreator(text)
                    store.dispatch(action)
                }
                let state = store.getState()
                return(
                <MyPosts updateNewPostText={handleUpdatePost}
                addPost={handleAddPost} posts={state.profilePage.postsData}
                newPostText={state.profilePage.newPostText}/>
                )
            }
        }
        </StoreContext.Consumer>
    )
}

export default MyPostsContainer