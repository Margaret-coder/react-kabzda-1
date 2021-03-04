import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Dialogs from "./components/Dialogs/Dialogs";
import Header from "./components/Header/Header.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Sidebar from "./components/Sidebar/Sidebar";

const App = (props) => {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <Sidebar sidebar={props.state.sidebar}/>
      <div className="app-wrapper-content">
      <Route path="/dialogs" render={() => <Dialogs dialogsPage={props.state.dialogsPage} addMessage={props.addMessage} updateMessage={props.updateMessage}/>}/>
      <Route path="/profile" render={()=><Profile postsPage={props.state.postsPage} addPost={props.addPost} updatePost={props.updatePost}/>}/>
      </div>
    </div>
  );
};

export default App;
