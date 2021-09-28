import { Redirect } from "react-router"
import Preloader from "../Common/Preloader/Preloader"
import MyPostsContainer from "./MyPosts/MyPostsContainer"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import ProfileInfoEditMode from "./ProfileInfo/ProfileInfoEditMode"
const Profile = (props) => {
    if(!props.profile){
        return <Preloader/>        
    }
    else if (props.editMode) {
        return (
            <div>
                <ProfileInfoEditMode profile={props.profile}
                editProfileInfo={props.editProfileInfo}
                authorizedUserId={props.authorizedUserId}/>
            </div>
        )
    }
    else if(!props.editMode){
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
    else {
        return <Redirect to="/login"/>
    }      
}

export default Profile