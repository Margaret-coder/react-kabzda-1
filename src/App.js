import { Route } from "react-router-dom";
import "./App.css";
import Dialogs from "./components/Dialogs/Dialogs";
import Header from "./components/Header/Header.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Sidebar from "./components/Sidebar/Sidebar";

const App = (props) => {
  const state = props.store.getState()
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <Sidebar sidebar={state.sidebarReducer}/>
      <div className="app-wrapper-content">
      <Route path="/dialogs" render={() => <Dialogs dialogsPage={state.dialogsReducer} dispatch={props.dispatch}/>}/>
      <Route path="/profile" render={()=><Profile postsPage={state.profileReducer} dispatch={props.dispatch}/>}/>
      </div>
    </div>
  );
};

export default App;
