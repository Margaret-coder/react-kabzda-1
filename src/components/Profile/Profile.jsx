import MyPostsContainer from "./MyPosts/MyPostsContainer"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import ProfileInfoEditMode from "./ProfileInfo/ProfileInfoEditMode"
const Profile = (props) => {
    if (props.authorizedUserId && !props.profile) {
        console.log("Profile props",props)
        return (
            <div>
                <ProfileInfoEditMode profile={props.profile}
                authorizedUserId={props.authorizedUserId}
                editProfileInfo={props.editProfileInfo}/>
                <MyPostsContainer/>
            </div>
        )
    }
    else
        return (
            <div>
                <ProfileInfo profile={props.profile}
                status={props.status} updateStatus={props.updateStatus} authorizedUserId={props.authorizedUserId}/>
                <MyPostsContainer/>
            </div>
        )
}

export default Profile