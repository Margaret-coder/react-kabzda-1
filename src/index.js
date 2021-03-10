import "./index.css";
import store from "./redux/store";
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App';

export let rerenderEntireTree = (state) => {
    ReactDOM.render(
      <BrowserRouter>
        <App
        store={store} dispatch={store.dispatch.bind(store)}
        />
    </BrowserRouter>, document.getElementById("root")
    );
}

rerenderEntireTree(store.getState())
store.subscribe(rerenderEntireTree)



