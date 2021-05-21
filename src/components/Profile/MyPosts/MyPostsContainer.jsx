import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { addPostActionCreator, sendNewPost, deletePost, editPost } from '../../../redux/profileReducer'
import MyPosts from './MyPosts'

let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage
    }
}

export default compose (connect(mapStateToProps, 
    {sendNewPost, deletePost, editPost}),
     withRouter)(MyPosts)