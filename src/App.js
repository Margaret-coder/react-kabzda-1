import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import { compose } from "redux";
import {initializeApp} from '../src/redux/appReducer'
import "./App.css";
import Preloader from "./components/Common/Preloader/Preloader";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import HeaderContainer from "./components/Header/HeaderContainer.jsx";
import LoginPage from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar.jsx";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import UsersContainer from "./components/Users/UsersContainer";

class App extends React.Component {
  componentDidMount(){
    this.props.initializeApp()
  }
  render(props){
    if (!this.props.initialized){
      return <Preloader/>
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        {/* <Sidebar sidebar={state.sidebarReducer}/> */}
        <div className="app-wrapper-content">
        <Route path="/dialogs" render={() => 
          <DialogsContainer/>}/>
        <Route path="/profile/:userId?" render={()=>
          <ProfileContainer/>}/>
          <Route path="/users" render={()=><UsersContainer/>}/>
          <Route path="/login" render={()=><LoginPage/>}/>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose(
  withRouter, 
  connect(mapStateToProps, {initializeApp}))(App);

//export default withRouter(connect(mapStateToProps, {getAuthUserData})(App));
//export default connect(mapStateToProps, {getAuthUserData})(App);
