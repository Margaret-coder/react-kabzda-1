import s from './MyPosts.module.css'
import React from 'react'
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "../../../App"
import state from "../../../redux/state"

const MyPosts = (props) => {
//    debugger
    let newPostElement = React.createRef()
    const handleAddPost = () => {
        let text = newPostElement.current.value
        props.addPost(text)
        ReactDOM.render(
            <BrowserRouter>
              <App
             state={state}
             addPost={props.addPost}
              />
          </BrowserRouter>, document.getElementById("root")
          );
          newPostElement.current.value = ""
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement}></textarea>
                </div>
                <div><button onClick={handleAddPost}>Add post</button></div>
            </div>
            <div className={s.posts}>
                {props.posts}
            </div>
        </div>
    )
}

export default MyPosts