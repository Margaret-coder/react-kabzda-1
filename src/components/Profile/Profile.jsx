import { Redirect } from "react-router"
import Preloader from "../Common/Preloader/Preloader"
import PostsContainer from "./MyPosts/PostsContainer"
import OutsiderInfo from "./ProfileInfo/OutsiderInfo"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import ProfileInfoEditMode from "./ProfileInfo/ProfileInfoEditMode"
const Profile = (props) => {
    const editMode = props.location.state ? props.location.state.editMode : false
    const edible = props.location.state ? props.location.state.edible : true
    // console.log('PROFILE edible', edible)
    // console.log('PROFILE editMode', editMode)
    if(!props.profile){
        return <Preloader/>        
    }
    else if(!edible){
        return(
            <div>
                <OutsiderInfo profile={props.profile}
                status={props.profile.status} 
                authorizedUserId={props.authorizedUserId}
                />
                <PostsContainer/>
            </div>
        )
    }
    else if (editMode) {
        return (
            <div>
                <ProfileInfoEditMode profile={props.profile}
                editProfileInfo={props.editProfileInfo}
                authorizedUserId={props.authorizedUserId}/>
            </div>
        )
    }
    else if(!editMode){
        console.log('-------Profile Info RENDER')
        console.log('state PROFILE_Container', props.state)
        return (
            <div>
                <ProfileInfo profile={props.profile}
                status={props.status} 
                updateStatus={props.updateStatus} 
                authorizedUserId={props.authorizedUserId}
                uploadImage={props.uploadImage}/>
                <PostsContainer/>
            </div>
        )
    }
    else {
        return <Redirect to="/login"/>
    }      
}

export default Profile