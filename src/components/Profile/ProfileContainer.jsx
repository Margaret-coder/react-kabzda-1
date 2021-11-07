import React from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import {getProfileById, getStatus, updateStatus, 
    editProfileInfo, uploadImage} from '../../redux/profileReducer'
import { Redirect, withRouter } from 'react-router'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component{
    componentDidUpdate(prevProps){
        // console.log('COMPONENT DID UPDATE WITHOUT A CONDITION -- PROFILE CONTAINER', this.props.state)
        if(this.props.location.state&&prevProps.location.state&&this.props.authorizedUserId){
            // console.log('prevProps.location.state.edible', prevProps.location.state.edible)
            // console.log('this.props.location.state.edible', this.props.location.state.edible)
            if(this.props.location.state.edible !== prevProps.location.state.edible)
            {
                this.props.getProfileById(this.props.authorizedUserId)
                this.props.getStatus(this.props.authorizedUserId)
            }
        }
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
    { getProfileById, getStatus, updateStatus, editProfileInfo, uploadImage }),
    withRouter,
//    withAuthRedirect
)
    (ProfileContainer)
