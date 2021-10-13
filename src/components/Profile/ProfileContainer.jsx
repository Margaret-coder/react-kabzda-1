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
    // constructor(props) {
    //     super(props);
    //     this.state = {editMode : false};
    // }
    componentDidUpdate(prevProps){
        // if (prevProps.location.key !== this.props.location.key) {
        //     this.setState({
        //         editMode: this.props.location.state,
        //     })
        // }
        if(!this.props.authorizedUserId) { // redirect to Login page if logout
            this.props.history.push("/login")
        }
    }
    componentDidMount(){
        if(this.props.location.state) {
            this.setState({
                editMode : this.props.location.state.editMode
            })
        }
        if(this.props.authorizedUserId){ // logged in profile only. should be profile by id
            var profile = this.props.getAuthProfile()
            if(profile){
                this.props.getStatus(this.props.authorizedUserId)
                this.props.getProfilePosts() 
            }
        }
        else this.props.history.push("/login")
    }
    render(){
        // if(this.props.location) console.log(this.props.location.state)
        // else console.log('no this.props.location.state')
        // console.log('this.state.editMode',this.state.editMode)
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
