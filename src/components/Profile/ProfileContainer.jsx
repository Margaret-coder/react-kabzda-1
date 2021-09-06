import React from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import { getUserProfile, getStatus, updateStatus, 
    editProfileInfo, uploadImage} from '../../redux/profileReducer'
import { getProfilePosts} from '../../redux/postsReducer'    
import { Redirect, withRouter } from 'react-router'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component{
    componentDidUpdate(){
        console.log('PROFILE componentDidUpdate:::this.props.authorizedUserId', this.props.authorizedUserId)
        console.log('PROFILE componentDidUpdate:::this.props.profile', this.props.profile)

        if(!this.props.authorizedUserId) { // redirect to Login page if logout
            this.props.history.push("/login")
        }
        // else if(this.props.authorizedUserId && !this.props.profile){
        //     console.log('PROFILE componentDidUpdate:::this.props.authorizedUserId', this.props.authorizedUserId)
        //     var profile = this.props.getUserProfile(this.props.authorizedUserId)
        //     console.log('PROFILE componentDidUpdate:::got Profile', profile)
        // }
    }
    componentDidMount(){
        console.log('---!!!!!!!!!this.props.location.state.editMode', this.props.location.state.editMode)
        // console.log('GET USER PROFILE Profile Container')
        // this.props.getUserProfile('612bd21a161f432be88fe666')
        // let userId = this.props.match.params.userId //что это за магия?
        console.log('PROFILE componentDidMount:::this.props.authorizedUserId', this.props.authorizedUserId)
        if(this.props.authorizedUserId){
            console.log('PROFILE componentDidMount:::getting Profile, userId', this.props.authorizedUserId)
            var profile = this.props.getUserProfile(this.props.authorizedUserId)
            console.log('PROFILE componentDidMount:::got Profile', profile)
            if(profile){
                this.props.getStatus(this.props.authorizedUserId)
                this.props.getProfilePosts() 
            }
        }
        else this.props.history.push("/login")
    }
    render(){
        if (!this.props.authorizedUserId) {
            console.log('REDIRECT TO LOGIN ::: !props.authorizedUserId && !props.profile')
            return <Redirect to="/login"/>
        }
        else {
            console.log('RENDER Profile Container this.props.profile', this.props.profile)
            return (
                <Profile {...this.props} 
                editMode={this.props.location.state.editMode}
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
    profile: state.profilePage.profile,
    postsData: state.profilePage.postsData,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId 
})

export default compose (
    connect (mapStateToProps, 
    {getUserProfile, getStatus, getProfilePosts, updateStatus, editProfileInfo, uploadImage}),
    withRouter,
//    withAuthRedirect
)
    (ProfileContainer)
