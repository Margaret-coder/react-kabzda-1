import React from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import { setUserProfileAC } from '../../redux/profileReducer'
import { withRouter } from 'react-router'
import { userAPI } from '../../api/api'

class ProfileContainer extends React.Component{
    componentDidMount(){
        let userId = this.props.match.params.userId
        if(!userId) userId=2
        userAPI.getUserProfile(userId)
            .then(data => {
                this.props.setUserProfile(data)
        })
    }
    render(){
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})

let mapDispatchToProps = (dispatch) => {
    return {
        setUserProfile : (profile) => {
            let action = setUserProfileAC(profile) 
            dispatch(action)
        }
    }
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect (mapStateToProps, mapDispatchToProps)(WithUrlDataContainerComponent)
