import React from 'react'
import blankImage from '../../../assets/images/samurai.png'
import { toggleIsFetching } from '../../../redux/usersReducer'
import s from './Post.module.css'

class Post extends React.Component {
    state = {
        editPost : false,
        edible: this.props.post.authorUserId === this.props.authorizedUserId,
        deletable: this.props.post.authorUserId === this.props.authorizedUserId||
        this.props.post.ownerUserId === this.props.authorizedUserId,
        message: this.props.post.message

    }
    onDeleteButtonClick = (postId, profileUId) => {
        this.props.deletePost(postId, profileUId)
    }
    onEditButtonClick = (id) => {
        this.props.editPost(id)
    }
    activateEditMode = () => {
        console.log("PROPS", this.props)
      
        // if(this.props.post.authorUserId === this.props.profilePageUserId){
            this.setState({
                editPost : true
            })
        // }
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
    Like = (postId, profileUId) => {
        this.props.likePost(postId, profileUId)
    }
    render(){
        // const edible = this.props.authorizedUserId === this.props.post.authorUserId
        var image
        this.props.img ? image = window.location.origin + '/' + this.props.img : image = blankImage
        const postId = this.props.post._id
        return (
            <div className={s.item}>
                <div className={s.upperBlock}>
                    <span className={s.photoBorder}>
                        <img className={s.photoImage} src={image} alt="avatar"/>
                    </span>
                    <div>
                    <div>{this.props.post.fullname}:</div>
                    <div className={s.message}>
                        {this.state.editPost ? 
                        <div><textarea value={this.state.message}
                        onBlur={this.deactivateEditMode}
                        autoFocus={true}
                        onChange={this.onTextChange}/></div> 
                        : <div>{this.props.post.message}</div>}
                    </div>
                </div>
                </div>
                <div className={s.operations}>
                    <div>like:{this.props.post.likeIds.length}</div>
                    {this.state.deletable&&<span>
                        <button onClick={() => this.onDeleteButtonClick(postId)}>delete</button></span>}
                    {this.state.edible&&<span><button onClick={this.activateEditMode}>edit</button></span>}
                    <span><button onClick={() => this.Like(postId)}>like</button></span>
                </div>
            </div>
        )
    }
}

export default Post