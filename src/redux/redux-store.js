 import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import profileReducer from './profileReducer'
import postsReducer from './postsReducer'
import dialogsReducer from './dialogsReducer'
import sidebarReducer from './sidebarReducer'
import usersReducer from './usersReducer'
import authReducer from './authReducer'
import appReducer from './appReducer'
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import {composeWithDevTools} from 'redux-devtools-extension'

let reducers = combineReducers({
    profilePage: profileReducer,
    posts: postsReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer 
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
|| compose;
const store = createStore(reducers,  
    composeEnhancers(applyMiddleware(thunkMiddleware)
  ));
//let store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store

export default store