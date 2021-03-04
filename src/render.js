import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import { addMessage, addPost, updateMessage, updatePost } from './redux/state';

export let rerenderEntireTree = (state) => {
ReactDOM.render(
  <BrowserRouter>
    <App
    state={state}
    addPost={addPost}
    updatePost = {updatePost}
    addMessage={addMessage}
    updateMessage={updateMessage}
    />
</BrowserRouter>, document.getElementById("root")
);
}
