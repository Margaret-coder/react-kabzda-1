import s from './MyPosts.module.css'
import React from 'react'
import {addPostActionCreator, updatePostActionCreator} from '../../../redux/state'

const MyPosts = (props) => {
    let newPostElement = React.createRef()
    const handleAddPost = () => {
        props.dispatch(addPostActionCreator())
        newPostElement.current.value = ""
    }
    const handleUpdatePost = () => {
        let text = newPostElement.current.value
        props.dispatch(updatePostActionCreator(text))
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea value={props.newPostText} onChange={handleUpdatePost} ref={newPostElement}></textarea>
                </div>
                <div><button onClick={handleAddPost}>Add post</button></div>
            </div>
            <div className={s.posts}>
                {props.posts}
            </div>
        </div>
    )
}

export default MyPosts