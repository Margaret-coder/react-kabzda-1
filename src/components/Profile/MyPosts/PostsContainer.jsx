import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { sendNewPost, deletePost, editPost, likePost, getProfilePosts } from '../../../redux/postsReducer'
import MyPosts from './MyPosts'

class PostsContainer extends React.Component{
    componentDidMount(){
        const userId = this.props.profilePageUserId
        var posts = this.props.getProfilePosts(userId)
    }
    componentDidUpdate(prevProps){
        // if (prevProps.profilePageUserId !== this.props.profilePageUserId) {
        if(prevProps.profile&&prevProps.profile.avaPath !== this.props.profile.avaPath){

            console.log('P O S T C O N T A I N E R ::: C O M P O N E N T   D I D   U P D A T E')
            const userId = this.props.profilePageUserId
            var posts = this.props.getProfilePosts(userId)
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