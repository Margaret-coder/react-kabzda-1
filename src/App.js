import { Route } from "react-router-dom";
import "./App.css";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import HeaderContainer from "./components/Header/HeaderContainer.jsx";
import LoginPage from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar.jsx";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import UsersContainer from "./components/Users/UsersContainer";

const App = (props) => {
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
};

export default App;
