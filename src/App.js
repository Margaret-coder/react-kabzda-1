import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Dialogs from "./components/Dialogs/Dialogs";
import Header from "./components/Header/Header.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Sidebar from "./components/Sidebar/Sidebar";
import { addPost } from "./redux/state";


const App = (props) => {
  return (
    <BrowserRouter>
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <Sidebar sidebar={props.state.sidebar}/>
      <div className="app-wrapper-content">
      <Route path="/dialogs" render={() => <Dialogs dialogsPage={props.state.dialogsPage}/>}/>
      <Route path="/profile" render={()=><Profile postsPage={props.state.postsPage} addPost={props.addPost} />}/>
      </div>
    </div>
    </BrowserRouter>
  );
};

export default App;
