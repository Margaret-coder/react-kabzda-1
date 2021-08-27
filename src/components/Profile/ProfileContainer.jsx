import React from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import { getAuthProfile, getStatus, updateStatus, 
    editProfileInfo, uploadImage} from '../../redux/profileReducer'
import { getProfilePosts} from '../../redux/postsReducer'    
import { Redirect, withRouter } from 'react-router'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component{
    componentDidUpdate(){
        if(!this.props.authorizedUserId) { // redirect to Login page if logout
            this.props.history.push("/login")
        }
    }
    componentDidMount(){
        let userId = this.props.match.params.userId //что это за магия?
        if(!userId) {
            userId=this.props.authorizedUserId
            this.props.getAuthProfile()
            if(!userId){
                this.props.history.push("/login")
            }
        }
        console.log("authorizedUserId", this.props.authorizedUserId)
        if(!this.props.profile){
            this.props.getAuthProfile()
            this.props.getStatus(userId)
            this.props.getProfilePosts() 
        }
    }
    render(){
        return (
            <Profile {...this.props} profile={this.props.profile}
            getAuthProfile={this.props.getAuthProfile}
            status={this.props.status} 
            updateStatus={this.props.updateStatus}
            editProfileInfo={this.props.editProfileInfo}
            uploadImage={this.props.uploadImage}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    postsData: state.profilePage.postsData,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId 
})

export default compose (
    connect (mapStateToProps, 
    {getAuthProfile, getStatus, getProfilePosts, updateStatus, editProfileInfo, uploadImage}),
    withRouter,
//    withAuthRedirect
)
    (ProfileContainer)
