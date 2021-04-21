import profileReducer, { addPostActionCreator, deletePostActionCreator } from "./profileReducer";

let state = {
    postsData: [
        { id: 1, message: "Hello", likesCount: 12 },
        { id: 2, message: "Yo", likesCount: 24 },
        { id: 3, message: "Again", likesCount: 2 }]
}

//#1
it('length of posts should be incremented', () => {
    let action = addPostActionCreator("Test Post")

    let newState = profileReducer(state, action)

    expect(newState.postsData.length).toBe(4)
})

//#2
it('message of new post should be correct', () => {
    let action = addPostActionCreator("new message")

    let newState = profileReducer(state, action)

    expect(newState.postsData[3].message).toBe("new message")
})

//#3
it('after deleting message length should be decremented', () => {
    const index = 1
    const message = state.postsData[index].message

    let action = deletePostActionCreator(index)

    let newState = profileReducer(state, action)
    expect(newState.postsData[index].message)
    .not.toBe(message)
})