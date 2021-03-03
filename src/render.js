import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import { addPost, updatePost } from './redux/state';

export let rerenderEntireTree = (state) => {
ReactDOM.render(
  <BrowserRouter>
    <App
    state={state}
    addPost={addPost}
    updatePost = {updatePost}
    />
</BrowserRouter>, document.getElementById("root")
);
}
