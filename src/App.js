import { Route } from "react-router-dom";
import "./App.css";
import Dialogs from "./components/Dialogs/Dialogs";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Header from "./components/Header/Header.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Sidebar from "./components/Sidebar/Sidebar";

const App = (props) => {
  console.log("app props", props)
  debugger
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      {/* <Sidebar sidebar={state.sidebarReducer}/> */}
      <div className="app-wrapper-content">
      <Route path="/dialogs" render={() => 
        <DialogsContainer 
        store={props.store}/>}/>
      <Route path="/profile" render={()=>
        <Profile 
        store={props.store}/>}/>
      </div>
    </div>
  );
};

export default App;
