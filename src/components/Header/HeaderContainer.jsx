import React from "react";
import Header from './Header'
import setAuthUserData from '../../redux/authReducer'
import { connect } from "react-redux";
import { userAPI } from "../../api/api";
class HeaderContainer extends React.Component{
    componentDidMount(){
        userAPI.getAuthMe()
        .then(data => {
            if(data.resultCode === 0){
                let{Id, email, login } = data.data
                this.props.setAuthUserData(Id, login, email)
            }
        })
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
    login: state.auth.login
})

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)