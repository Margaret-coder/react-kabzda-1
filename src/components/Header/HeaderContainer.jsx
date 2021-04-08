import React from "react";
import Header from './Header'
import {getAuthUserData, logoutUser } from '../../redux/authReducer'
import { connect } from "react-redux";

class HeaderContainer extends React.Component{
    componentDidMount(){
          this.props.getAuthUserData()
    }
    render()
    {
//        debugger
        return(
            <Header {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, 
    {getAuthUserData, logoutUser})(HeaderContainer)