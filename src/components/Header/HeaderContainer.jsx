import React from "react";
import Header from './Header'
import setAuthUserData, { getAuthMeThunkCreator } from '../../redux/authReducer'
import { connect } from "react-redux";

class HeaderContainer extends React.Component{
    componentDidMount(){
        debugger
        getAuthMeThunkCreator()
        debugger
    }
    render()
    {
        debugger
        return(
            <Header {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)