import React from "react";
import Header from './Header'
import { getAuthUserData, logoutUser } from '../../redux/authReducer'
import { connect } from "react-redux";

class HeaderContainer extends React.Component{
    componentDidUpdate(prevProps){
        if(prevProps.state.profilePage.profile&&prevProps.state.profilePage.profile.avaPath !== this.props.state.profilePage.profile.avaPath){
            this.props.getAuthUserData()
        }
    }
    render()
    {
        return(
            <Header {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    email: state.auth.email,
    login: state.auth.login,
    avaPath: state.auth.avaPath,
    state: state
})

export default connect(mapStateToProps, 
    { getAuthUserData, logoutUser })(HeaderContainer)