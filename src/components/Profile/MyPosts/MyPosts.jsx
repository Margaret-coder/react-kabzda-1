import s from './MyPosts.module.css'
import React from 'react'
import Post from '../Post/Post'

const MyPosts = (props) => {
    let newPostText = props.profilePage.newPostText
    let postsElements = props.profilePage.postsData.map(
        p=><Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

        const addNewPost = () => {
        props.handleAddPost()
    }

    const updatePost = (e) => {
        let text = e.target.value
        props.handleUpdatePost(text)
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea value={newPostText}  
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