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
      <Route path="/dialogs" render={() => <Dialogs store={props.store} dialogsPage={props.store._state.dialogsPage} addMessage={props.store.addMessage} updateMessage={props.store.updateMessage}/>}/>
      <Route path="/profile" render={()=><Profile store={props.store} state={props.store.getState()} postsPage={props.store._state.postsPage} addPost={props.store.addPost} updatePost={props.store.updatePost}/>}/>
      </div>
    </div>
  );
};

export default App;
