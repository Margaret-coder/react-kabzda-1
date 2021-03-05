import MyPosts from "./MyPosts/MyPosts"
import Post from "./Post/Post"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
const Profile = (props) => {
    let postsElements = props.postsPage.postsData.map((post) => {
        return <Post key={post.id} message={post.message} likecount={post.likesCount}/>
      })
      let newPostText = props.postsPage.newPostText
  //    debugger
    return (
        <div>
            <ProfileInfo />
            <MyPosts store={props.store} state={props.state} posts={postsElements} newPostText={newPostText} addPost={props.addPost} updatePost={props.updatePost}/>
        </div>
    )
}

export default Profile