import React from 'react'
import {addPostActionCreator, updatePostActionCreator} from '../../../redux/profileReducer'
import MyPosts from './MyPosts'

const MyPostsContainer = (props) => {
    debugger
    let state = props.store.getState()
    console.log("state profile Container", state)
    const handleAddPost = () => {
        props.store.dispatch(addPostActionCreator())
    }
    const handleUpdatePost = (text) => {
        let action = updatePostActionCreator(text)
        props.store.dispatch(action)
    }
    return (
        <MyPosts updateNewPostText={handleUpdatePost}
        addPost={handleAddPost} posts={state.profileReducer.postsData}
        newPostText={state.profileReducer.newPostText}/>
    )
}

export default MyPostsContainer