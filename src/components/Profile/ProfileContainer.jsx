import React from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import { getAuthProfile, getProfileById, getStatus, updateStatus, 
    editProfileInfo, uploadImage} from '../../redux/profileReducer'
import { getProfilePosts} from '../../redux/postsReducer'    
import { Redirect, withRouter } from 'react-router'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component{
    componentDidUpdate(prevProps){
        if (prevProps.location.key !== this.props.location.key) {
            console.log('componentDidUpdate(prevProps)')
            const edible = this.props.location.state ? this.props.location.state.edible : true
            if(this.props.authorizedUserId&&edible){
                var profile = this.props.getAuthProfile()
                if(profile){
                    this.props.getStatus(this.props.authorizedUserId)
                    this.props.getProfilePosts(this.props.authorizedUserId) 
                }
            }
        }
        if(!this.props.authorizedUserId) { // redirect to Login page if logout
            this.props.history.push("/login")
        }
    }
    componentDidMount(){
        if(this.props.authorizedUserId){ // logged in profile only. should be profile by id
            if(this.props.location.state) {
                const editMode = this.props.location.state ? this.props.location.state.editMode : false
                const edible = this.props.location.state ? this.props.location.state.edible : true
                if(this.props.authorizedUserId&&edible){
                    var profile = this.props.getAuthProfile()
                    if(profile){
                        this.props.getStatus(this.props.authorizedUserId)
                        this.props.getProfilePosts(this.props.authorizedUserId) 
                    }
                }
                else if(!edible){
                  var profile = this.props.getProfileById(this.props.location.state.userId)
                  var posts = this.props.getProfilePosts(this.props.location.state.userId)
                }
            }
        }
        else{
            this.props.history.push("/login")
        }
    }
    render(){
        if (!this.props.authorizedUserId) {
            return <Redirect to="/login"/>
        }
        else {
            return (
                <Profile {...this.props} 
                // editMode={this.state.editMode}
                profile={this.props.profile}
                status={this.props.status} 
                updateStatus={this.props.updateStatus}
                editProfileInfo={this.props.editProfileInfo}
                uploadImage={this.props.uploadImage}/>
            )
        }
    }
}

let mapStateToProps = (state) => ({
    state: state,
    profile: state.profilePage.profile,
    postsData: state.profilePage.postsData,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId 
})

export default compose (
    connect (mapStateToProps, 
    {getAuthProfile, getProfileById, getStatus, getProfilePosts, updateStatus, editProfileInfo, uploadImage}),
    withRouter,
//    withAuthRedirect
)
    (ProfileContainer)
