import { connect } from 'react-redux'
import { addPostActionCreator } from '../../../redux/profileReducer'
import MyPosts from './MyPosts'

let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        handleAddPost : (newPostText) => {
            let action = addPostActionCreator(newPostText) 
            dispatch(action)
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, 
    mapDispatchToProps)
    (MyPosts)
export default MyPostsContainer