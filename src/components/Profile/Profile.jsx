import MyPostsContainer from "./MyPosts/MyPostsContainer"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import ProfileInfoEditMode from "./ProfileInfo/ProfileInfoEditMode"
const Profile = (props) => {
    let profile = props.getAuthProfile
    // if (props.authorizedUserId && !props.profile) {
    if (props.authorizedUserId && !profile) {
        // console.log('!props.profile')
        console.log('No profile data')
        return (
            <div>
                <ProfileInfoEditMode profile={props.profile}
                editProfileInfo={props.editProfileInfo}
                authorizedUserId={props.authorizedUserId}/>
            </div>
        )
    }
    else{
        console.log('PROFILE')
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
}

export default Profile