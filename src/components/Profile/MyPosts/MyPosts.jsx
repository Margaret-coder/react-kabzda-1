import s from './MyPosts.module.css'
import React from 'react'
import Post from '../Post/Post'

const MyPosts = (props) => {
    debugger
    let postsElements = props.posts.map(
        p=><Post message={p.message} likesCount={p.likesCount}/>)
        const addNewPost = () => {
        props.addPost()
    }
    const updatePost = (e) => {
        let text = e.target.value
        props.updateNewPostText(text)
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea 
                        value={props.newPostText} 
                        onChange={updatePost}>
                    </textarea>
                </div>
                <div><button onClick={addNewPost}>Add post</button></div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts