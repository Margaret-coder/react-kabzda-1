import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { sendNewPost, deletePost, editPost, likePost, getUsersPosts } from '../../../redux/postsReducer'
import MyPosts from './MyPosts'

class PostsContainer extends React.Component{
    componentDidMount(){
        const userId = this.props.profilePageUserId
        this.props.getUsersPosts(userId)
    }  
    componentDidUpdate(prevProps){
        if(prevProps.state.profilePage.profile&&prevProps.state.profilePage.profile.userId !== this.props.state.profilePage.profile.userId){
            this.props.getUsersPosts(this.props.profilePageUserId)
        }
        /* Synchronization avatar upload */
        else if(prevProps.state.auth&&prevProps.state.auth.avaPath !== this.props.state.auth.avaPath){
            this.props.getUsersPosts(this.props.profilePageUserId)
        }
        console.log('P O S T S  C O N T A I N E R  Component did update without condition', this.props.state)
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
    {getUsersPosts, sendNewPost, deletePost, editPost, likePost}),
     withRouter)(PostsContainer)