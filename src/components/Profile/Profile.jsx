import MyPostsContainer from "./MyPosts/MyPostsContainer"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
const Profile = (props) => {
    console.log("Profile props", props)
    return (
        <div>
            <ProfileInfo profile={props.profile}
            status={props.status} updateStatus={props.updateStatus} authorizedUserId={props.authorizedUserId}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile