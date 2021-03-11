import "./index.css";
import store from "./redux/redux-store";
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import StoreContext from "./redux/StoreContext";

export let rerenderEntireTree = (state) => {
    ReactDOM.render(
      <BrowserRouter>
      <StoreContext.Provider value={store}>
        <App/>
      </StoreContext.Provider>
    </BrowserRouter>, document.getElementById("root")
    );
}

rerenderEntireTree(store.getState())

store.subscribe(() => {
  let state = store.getState()
  rerenderEntireTree(state)
})



