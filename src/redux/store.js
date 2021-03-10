import dialogsReducer from "./dialogsReducer"
import profileReducer from "./profileReducer"
import sidebarReducer from "./sidebarReducer"

let store = {
  _subscriber(){
    console.log('no subscribers(observers)')
  },
  _state : {
    dialogsPage: {dialogsData : [
      { id: 1, userId: 1, name: "Member 1", image_src: "https://images.pexels.com/photos/905021/pexels-photo-905021.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" },
      { id: 2, userId: 2, name: "Member 2", image_src: "https://images.pexels.com/photos/905021/pexels-photo-905021.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" },
      { id: 3, userId: 3, name: "Member 3", image_src: "https://images.pexels.com/photos/905021/pexels-photo-905021.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" },
      { id: 4, userId: 4, name: "Member 4", image_src: "https://images.pexels.com/photos/905021/pexels-photo-905021.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" },
      { id: 5, userId: 5, name: "Member 5", image_src: "https://images.pexels.com/photos/905021/pexels-photo-905021.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" },
      { id: 6, userId: 6, name: "Member 6", image_src: "https://images.pexels.com/photos/905021/pexels-photo-905021.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" },
    ],
    messagesData : [
      { id: 1, message: "Hello", userId: 0 },
      { id: 2, message: "Yo", userId: 2 },
      { id: 3, message: "Again", userId: 0 },
      { id: 4, message: "But wait", userId: 2 },
      { id: 5, message: "Bye", userId: 0 },
      { id: 6, message: "But wtrtrtrtrait", userId: 2 },
    ],
   newMessageText: ''
},
  postsPage: {postsData : [
      { id: 1, message: "Hello", likesCount: 12 },
      { id: 2, message: "Yo", likesCount: 24 },
      { id: 3, message: "Again", likesCount: 2 },
      { id: 4, message: "But wait", likesCount: 0 },
      { id: 5, message: "Bye", likesCount: 18 },
      { id: 6, message: "But wtrtrtrtrait", likesCount: 3 },
      { id: 7, message: "Bili Bili Bili bli", likesCount: 2 },
      { id: 8, message: "Pokurit ne naydetsa", likesCount: 4 },
      { id: 9, message: "It's my life, now and ever", likesCount: 8 },
      { id: 10, message: "Hello", likesCount: 1 },
    ],
   newPostText: ''
  },
  sidebar: {sidebarData: [
    {id: 1, name: "FirstMember"}, 
    {id: 2, name: "SecondMember"}, 
    {id: 3, name: "ThirdMember"}, 
  ]}
},
  getState(){
    //debugger
    return this._state
  },
  callSubscriber () {
    console.log("State changed")
  },
  _addPost () {
    const newPost = { 
      id: 11, 
      message: this._state.postsPage.newPostText, 
      likesCount: 0 }
    this._state.postsPage.postsData.push(newPost)
    this._state.postsPage.newPostText = ''
    this.callSubscriber(this._state)
  },
  _updatePost (postText) {
    this._state.postsPage.newPostText = postText
    this.callSubscriber(this._state)
  },
  _addMessage () {
    const newMessage = {
      id:7, 
      message:  this._state.dialogsPage.newMessageText, 
      userId: 0}
    this._state.dialogsPage.messagesData.push(newMessage)
    this.callSubscriber(this._state)
  },
  _updateMessage (messageText) {
    this._state.dialogsPage.newMessageText = messageText
    this.callSubscriber(this._state)
  },
    subscribe (observer) {
    this.callSubscriber = observer
  },
  dispatch(action){
console.log( "HI",   this._state.postsPage)
    this._state.postsPage = profileReducer(this._state.postsPage, action)
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
    this._state.sidebar = sidebarReducer(this._state.sidebar, action)
    this.callSubscriber(this._state)
  }
}
export default store