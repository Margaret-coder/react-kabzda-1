import React from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import { getUserProfile, getStatus, updateStatus, 
    getProfilePosts} 
    from '../../redux/profileReducer'
import { withRouter } from 'react-router'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component{
    componentDidMount(){
        console.log('ProfileContainer componentDidMount this.props', this.props)
        let userId = this.props.match.params.userId
        console.log('userId', this.props.authorizedUserId)
        if(!userId) {
            userId=this.props.authorizedUserId
            if(!userId){
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
        this.props.getProfilePosts() 
    }
    render(){
        return (
            <Profile {...this.props} profile={this.props.profile}
            status={this.props.status} 
            updateStatus={this.props.updateStatus}/>
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
    {getUserProfile, getStatus, getProfilePosts, updateStatus}),
    withRouter,
//    withAuthRedirect
)
    (ProfileContainer)
