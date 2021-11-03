import React from "react";
import Header from './Header'
import {logoutUser } from '../../redux/authReducer'
import { connect } from "react-redux";

class HeaderContainer extends React.Component{
    render()
    {
        console.log('Header Container STATE:::', this.props.state)
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
    {logoutUser})(HeaderContainer)