import s from './MyPosts.module.css'
import React from 'react'


const MyPosts = (props) => {
//    debugger
    let newPostElement = React.createRef()
    const handleAddPost = () => {
        let text = newPostElement.current.value
        props.addPost(text)
        newPostElement.current.value = ""
    }
    const handleUpdatePost = () => {
        let text = newPostElement.current.value
        props.updatePost(text)
        console.log(props.newPostText)
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