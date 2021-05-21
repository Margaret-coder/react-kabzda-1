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
    render(){
        return (
            <div className={s.item}>
                <img src="https://images.pexels.com/photos/905021/pexels-photo-905021.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="avatar"/>
            {this.state.editPost ? 
            <span><textarea value={this.state.message}
            onBlur={this.deactivateEditMode}
            autoFocus={true}
            onChange={this.onTextChange}/></span> 
            : <span>{this.props.post.message}</span>}
            <div>
            <span>like:{this.props.post.likesCount}</span>
            <div>
                <span><button onClick={() => this.onDeleteButtonClick(this.props.post._id)}>delete</button></span>
                <span><button onClick={this.activateEditMode}>edit</button></span>
            </div>
            </div>
        </div>
        )
    }
}

export default Post