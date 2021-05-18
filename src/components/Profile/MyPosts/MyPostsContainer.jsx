import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { addPostActionCreator, sendNewPost } from '../../../redux/profileReducer'
import MyPosts from './MyPosts'

let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage
    }
}
// let mapDispatchToProps = (dispatch) => {
//     return {
//         handleAddPost : (newPostText) => {
//             let action = addPostActionCreator(newPostText) 
//             dispatch(action)
//         }
//     }
// }


// const MyPostsContainer = connect(mapStateToProps, 
//     mapDispatchToProps)
//     (MyPosts)
//export default MyPostsContainer

export default compose (connect(mapStateToProps, {sendNewPost}), withRouter)(MyPosts)