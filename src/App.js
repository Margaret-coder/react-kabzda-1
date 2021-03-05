import { Route } from "react-router-dom";
import "./App.css";
import Dialogs from "./components/Dialogs/Dialogs";
import Header from "./components/Header/Header.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Sidebar from "./components/Sidebar/Sidebar";

const App = (props) => {
  //debugger;
  console.log("props", props)
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <Sidebar sidebar={props.store._state.sidebar}/>
      <div className="app-wrapper-content">
      <Route path="/dialogs" render={() => <Dialogs dialogsPage={props.store._state.dialogsPage} dispatch={props.dispatch}/>}/>
      <Route path="/profile" render={()=><Profile postsPage={props.store._state.postsPage} dispatch={props.dispatch}/>}/>
      </div>
    </div>
  );
};

export default App;
