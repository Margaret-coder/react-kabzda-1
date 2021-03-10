import "./index.css";
import store from "./redux/redux-store";
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App';

export let rerenderEntireTree = (state) => {
  //debugger
    ReactDOM.render(
      <BrowserRouter>
        <App
        store={store} dispatch={store.dispatch.bind(store)}
        />
    </BrowserRouter>, document.getElementById("root")
    );
}

rerenderEntireTree(store.getState())

store.subscribe(() => {
  let state = store.getState()
  rerenderEntireTree(state)
})



