let initialState = {sidebarData: [
    {id: 1, name: "FirstMember"}, 
    {id: 2, name: "SecondMember"}, 
    {id: 3, name: "ThirdMember"}, 
  ]}

const sidebarReducer = (state = initialState, action) => {
    switch(action.type){
    default: return state
    }
}
export default sidebarReducer
