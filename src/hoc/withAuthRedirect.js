import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
})

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component{
        render(){
            console.log('withAuthRedirect')
            if(!this.props.isAuth) return <Redirect to={'/login'}/>
            return <Component {...this.props}/>     
        }
    }

    let connectedAuthRedirectComponent 
    = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return connectedAuthRedirectComponent
}