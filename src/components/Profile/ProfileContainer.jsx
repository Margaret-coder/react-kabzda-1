import React from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import { getAuthUserData } from "../../redux/authReducer";
import { getProfilePosts } from "../../redux/postsReducer";
import {getProfileById, getStatus, updateStatus, 
    editProfileInfo, uploadImage} from '../../redux/profileReducer'
import { Redirect, withRouter } from 'react-router'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component{
    componentDidUpdate(prevProps){
        /* Synchronous avatar update. Posts, Header, Profile */
        if(prevProps.profile&&prevProps.profile.avaPath !== this.props.profile.avaPath){
            console.log('------prevProps.profile&&prevProps.profile.avaPath', prevProps.profile&&prevProps.profile.avaPath)
            console.log('------this.props.profile.avaPath', this.props.profile.avaPath)
            const authData = this.props.getAuthUserData()
            if(this.props.authorizedUserId){
                const profile = this.props.getProfileById(this.props.authorizedUserId)
                console.log('PROFILE____________________DATA::::', profile)
                const posts = this.props.getProfilePosts(this.props.authorizedUserId)
                console.log('POSTS____________________DATA::::', posts)
            }
            console.log('AUTH____________________DATA::::', authData)
        }
        if (prevProps.location.key !== this.props.location.key) {
            console.log('componentDidUpdate(prevProps.location.key !== this.props.location.key)')
            console.log('prevProps.location', prevProps.location)
            console.log('this.props.location', this.props.location)
            if(this.props.authorizedUserId){ // logged in profile only
                var userId
                const editMode = this.props.location.state ? this.props.location.state.editMode : false
                const edible = this.props.location.state ? this.props.location.state.edible : true
                if(edible){
                    userId = this.props.authorizedUserId
                }
                else if(!edible){
                    userId = this.props.location.state.userId
                }
                if (editMode === false){
                    const profile = this.props.getProfileById(userId)
                    console.log('GET PROFILE COMPONENT UPDATE editMode === false')
                    if(profile&&edible){
                        this.props.getStatus(userId)
                    }
                }
            }
            else{
                this.props.history.push("/login")
            }
        }
        else console.log('COMPONENT DID UPDATE WITHOUT A CONDITION -- PROFILE CONTAINER')
    }
    componentDidMount(){
        if(this.props.authorizedUserId){ // logged in profile only
            var userId
            if(this.props.location.state) {
                // const editMode = this.props.location.state ? this.props.location.state.editMode : false
                const edible = this.props.location.state ? this.props.location.state.edible : true
                if(edible){
                    userId = this.props.authorizedUserId
                }
                else if(!edible){
                  userId = this.props.location.state.userId
                }
                const profile = this.props.getProfileById(userId)
                if(profile){
                    this.props.getStatus(userId)
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
                state={this.props.state}
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
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId 
})

export default compose (
    connect (mapStateToProps, 
    {getAuthUserData, getProfilePosts, getProfileById, getStatus, updateStatus, editProfileInfo, uploadImage}),
    withRouter,
//    withAuthRedirect
)
    (ProfileContainer)
