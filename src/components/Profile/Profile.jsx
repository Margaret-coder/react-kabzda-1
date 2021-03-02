import MyPosts from "./MyPosts/MyPosts"
import Post from "./Post/Post"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
const Profile = (props) => {
    let postsElements = props.postsPage.postsData.map((post) => {
        return <Post key={post.id} message={post.message} likecount={post.likesCount}/>
      })
    return (
        <div>
            <ProfileInfo />
            <MyPosts posts={postsElements} addPost={props.addPost}/>
        </div>
    )
}

export default Profile