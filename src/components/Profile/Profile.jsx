import MyPosts from "./MyPosts/MyPosts"
import Post from "./Post/Post"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
const Profile = (props) => {
  //  debugger
    let postsElements = props.postsPage.postsData.map((post) => {
        return <Post key={post.id} message={post.message} likecount={post.likesCount}/>
      })
      let newPostText = props.postsPage.newPostText
    return (
        <div>
            <ProfileInfo />
            <MyPosts posts={postsElements} text={props.postsPage.newPostText} dispatch={props.dispatch}/>
        </div>
    )
}

export default Profile