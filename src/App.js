import { Route } from "react-router-dom";
import "./App.css";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Header from "./components/Header/Header.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import UsersContainer from "./components/Users/UsersContainer";

const App = (props) => {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      {/* <Sidebar sidebar={state.sidebarReducer}/> */}
      <div className="app-wrapper-content">
      <Route path="/dialogs" render={() => 
        <DialogsContainer/>}/>
      <Route path="/profile/:userId?" render={()=>
        <ProfileContainer/>}/>
        <Route path="/users" render={()=><UsersContainer/>}/>
      </div>
    </div>
  );
};

export default App;
