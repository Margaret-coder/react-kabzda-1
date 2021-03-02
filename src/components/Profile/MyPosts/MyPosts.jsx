import s from './MyPosts.module.css'
import React from 'react'
import Post from '../Post/Post.jsx'

const MyPosts = (props) => {
    let newPostElement = React.createRef()
    const addPost = () => {
        let text = newPostElement.current.value
        alert(text)
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement}></textarea>
                </div>
                <div><button onClick={addPost}>Add post</button></div>
            </div>
            <div className={s.posts}>
                {props.posts}
            </div>
        </div>
    )
}

export default MyPosts