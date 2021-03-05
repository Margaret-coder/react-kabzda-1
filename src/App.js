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
      <Route path="/dialogs" render={() => <Dialogs dialogsPage={props.store._state.dialogsPage} addMessage={props.store.addMessage.bind(props.store)} updateMessage={props.store.updateMessage.bind(props.store)}/>}/>
      <Route path="/profile" render={()=><Profile postsPage={props.store._state.postsPage} addPost={props.store.addPost.bind(props.store)} updatePost={props.store.updatePost.bind(props.store)}/>}/>
      </div>
    </div>
  );
};

export default App;
