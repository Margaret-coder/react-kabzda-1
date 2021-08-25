import MyPostsContainer from "./MyPosts/MyPostsContainer"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import ProfileInfoEditMode from "./ProfileInfo/ProfileInfoEditMode"
const Profile = (props) => {
    if (props.authorizedUserId && !props.profile) {
        console.log('!props.profile')
        return (
            <div>
                <ProfileInfoEditMode profile={props.profile}
                editProfileInfo={props.editProfileInfo}
                authorizedUserId={props.authorizedUserId}/>
            </div>
        )
    }
    else
        return (
            <div>
                <ProfileInfo profile={props.profile}
                status={props.status} updateStatus={props.updateStatus} 
                authorizedUserId={props.authorizedUserId}
                uploadImage={props.uploadImage}/>
                <MyPostsContainer/>
            </div>
        )
}

export default Profile