import { Redirect } from "react-router"
import Preloader from "../Common/Preloader/Preloader"
import MyPostsContainer from "./MyPosts/MyPostsContainer"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import ProfileInfoEditMode from "./ProfileInfo/ProfileInfoEditMode"
const Profile = (props) => {
    if(!props.profile && !props.editMode){
        return <Preloader/>        
    }
    else if (props.editMode) {
        console.log('!props.profile && editMode')
        return (
            <div>
                <ProfileInfoEditMode profile={props.profile}
                editProfileInfo={props.editProfileInfo}
                authorizedUserId={props.authorizedUserId}/>
            </div>
        )
    }
    else if(!props.editMode){
        console.log('else if(props.profile)')
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
        console.log('else <Redirect to="/login"/>')
        return <Redirect to="/login"/>
    }      
}

export default Profile