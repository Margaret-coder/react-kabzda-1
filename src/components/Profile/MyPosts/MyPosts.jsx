import s from './MyPosts.module.css'
import React from 'react'
import Post from '../Post/Post'
import {Field, reduxForm} from 'redux-form'
import { maxLengthCreator, required } from '../../../utils/validators/validators'
import { Textarea } from '../../Common/FormControls/FormControls'

const maxLength10 = maxLengthCreator(10)

const MyPostsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.postsBlock}>
            <div>
                <Field name={'newPostText'} 
                    placeholder={'New Post'}
                    component={Textarea}
                    validate={[required, maxLength10]}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
} 

const MyPostsReduxForm = reduxForm({form: 'message form'})
(MyPostsForm)

const MyPosts = (props) => {
    const posts = props.posts
    console.log('POSTS STATE:::', props.state)
    console.log('POSTS:::', posts)
    var postsElements
    if(posts)
    postsElements = posts.map( post=>posts&&<Post 
        key={post._id} 
        authorizedUserId={props.authorizedUserId}
        post={post} deletePost={props.deletePost}
        editPost={props.editPost} likePost={props.likePost} 
        profilePageUserId={props.profilePageUserId}
        fullname={post.fullname}
        img={post.avaPath}/>)
    const addNewPost = (values) => {
        console.log('props.ownerPageUserId', props.ownerPageUserId)
        props.sendNewPost(values.newPostText, props.ownerPageUserId)
        values.newPostText = '' 
    }
    return (
    <div>
        <h3>My posts</h3>
        <MyPostsReduxForm onSubmit={addNewPost}/> 
        <div className={s.posts}>
        {postsElements}
        </div>
    </div> 
    )
}
    
export default MyPosts