import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { sendNewPost, deletePost, editPost, likePost, getProfilePosts } from '../../../redux/postsReducer'
import MyPosts from './MyPosts'

class PostsContainer extends React.Component{
    componentDidMount(){
        const userId = this.props.profilePageUserId
        console.log('MyPOSTS CONTAINER this props state', this.props.state)
                  var posts = this.props.getProfilePosts(userId)
        console.log('render POSTS in POSTS CONTAINER::::', posts)
    }
    componentDidUpdate(prevProps){
        if (prevProps.posts.length !== this.props.posts.length) {
        console.log('C O M P O N E N T   D I D   U P D A T E')
        }
    }
    render(){
        return (<MyPosts
        state={this.props.state}
        posts={this.props.posts}
        authorizedUserId={this.props.authorizedUserId}
        ownerPageUserId={this.props.ownerUserId}
        sendNewPost={this.props.sendNewPost}
        deletePost={this.props.deletePost}
        editPost={this.props.editPost}
        likePost={this.props.likePost}/>)
    }
}

let mapStateToProps = (state) => {
    return {
        profilePageUserId: state.profilePage.profile.userId,
        authorizedUserId: state.auth.userId,
        ownerUserId: state.posts.ownerUserId,
        posts: state.posts.postsData, 
        state: state 
    }
}

export default compose (
    connect(mapStateToProps, 
    {getProfilePosts, sendNewPost, deletePost, editPost, likePost}),
     withRouter)(PostsContainer)