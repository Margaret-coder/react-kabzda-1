import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { sendNewPost, deletePost, editPost, likePost } from '../../../redux/postsReducer'
import MyPosts from './MyPosts'

let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
        posts: state.posts,
        authorizedUserId: state.auth.userId 
    }
}

export default compose (connect(mapStateToProps, 
    {sendNewPost, deletePost, editPost, likePost}),
     withRouter)(MyPosts)