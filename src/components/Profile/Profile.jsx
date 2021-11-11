import { Redirect } from "react-router"
import Preloader from "../Common/Preloader/Preloader"
import PostsContainer from "./MyPosts/PostsContainer"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import ProfileInfoEditMode from "./ProfileInfo/ProfileInfoEditMode"
const Profile = (props) => {
    const editMode = props.location.state ? props.location.state.editMode : false
    const edible = props.location.state ? props.location.state.edible : true
    console.log('edible', edible)
    console.log('editMode::::', editMode)
    // var edible
    // if(props.profile&&props.profile.userId&&props.authorizedUserId){
    //     edible = props.authorizedUserId === props.profile.userId
    // } 
    // else edible = false
    if(!props.profile){
        return <Preloader/>        
    }
    else if(!edible){
        console.log('NOT EDIBLE')
        return(
            <div>
                <ProfileInfo profile={props.profile}
                avaPath={props.location.state.avaPath}
                username={props.location.state.username}
                status={props.profile.status} 
                authorizedUserId={props.authorizedUserId}
                edible={false}
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
                authorizedUserId={props.authorizedUserId}
                />
            </div>
        )
    }
    else if(!editMode){
        console.log('props.state.auth.avaPath::::::::::::::::::::::', props.state.auth.avaPath)
        return (
            <div>
                <ProfileInfo profile={props.profile}
                username={props.state.auth.login}
                avaPath={props.state.auth.avaPath}
                status={props.status} 
                updateStatus={props.updateStatus} 
                authorizedUserId={props.authorizedUserId}
                uploadImage={props.uploadImage}
                edible={true}/>
                <PostsContainer/>
            </div>
        )
    }
    else {
        return <Redirect to="/login"/>
    }      
}

export default Profile