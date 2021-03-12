import { connect } from 'react-redux'
import { addPostActionCreator, updatePostActionCreator } from '../../../redux/profileReducer'
import MyPosts from './MyPosts'

let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        handleAddPost : () => {
            let action = addPostActionCreator() 
            dispatch(action)
            debugger
        },
        handleUpdatePost : (text) => {
            let action = updatePostActionCreator(text)
            dispatch(action)
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MyPostsContainer