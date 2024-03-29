import "./index.css";
import store from "./redux/redux-store";
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import {Provider} from "react-redux";

export let rerenderEntireTree = (state) => {
    ReactDOM.render(
      <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>, document.getElementById("root")
    );
}

rerenderEntireTree(store.getState())

store.subscribe(() => {
  let state = store.getState()
  // console.log(state)
  rerenderEntireTree(state)
})



