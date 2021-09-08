import React from 'react'
import { toggleIsFetching } from '../../../redux/usersReducer'
import s from './Post.module.css'

class Post extends React.Component {
    state = {
        editPost : false,
        message: this.props.post.message

    }
    onDeleteButtonClick = (id) => {
        this.props.deletePost(id)
    }
    onEditButtonClick = (id) => {
        this.props.editPost(id)
    }
    activateEditMode = () => {
        this.setState({
            editPost : true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editPost : false
        })
        const newPost = this.props.post
        newPost.message = this.state.message
        this.props.editPost(newPost)
    }
    onTextChange = (e) => {
        this.setState({
            message : e.currentTarget.value
        })
    }
    Like = (post_id) => {
        const currentUser_id = '2' // TO DO get current user id
        this.props.likePost(post_id, currentUser_id)
    }
    render(){
        return (
            <>
            <div className={s.item}>
                <div>
                    <img src={this.props.img} alt="avatar"/>
                    <span>{this.props.post.fullname}</span>
                    {this.state.editPost ? 
                    <div><textarea value={this.state.message}
                    onBlur={this.deactivateEditMode}
                    autoFocus={true}
                    onChange={this.onTextChange}/></div> 
                    : <div>{this.props.post.message}</div>}
                    <div>
                    <div>like:{this.props.post.likesCount}</div>
                </div>
                <div>
                    <span><button onClick={() => this.onDeleteButtonClick(this.props.post._id)}>delete</button></span>
                    <span><button onClick={this.activateEditMode}>edit</button></span>
                    <span><button onClick={() => this.Like(this.props.post._id)}>like</button></span>
                </div>
                </div>
            </div>
            </>
        )
    }
}

export default Post