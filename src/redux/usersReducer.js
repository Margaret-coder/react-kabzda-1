let FOLLOW = 'FOLLOW'
let UNFOLLOW = 'UNFOLLOW'
let SET_USERS = 'SET_USERS'

let initialState = {
    users: [
    {id: 1, 
        profilePhoto: 'https://images.pexels.com/photos/157920/woman-face-curly-hair-157920.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        fullName: 'Girlu', status: 'Menya trudno nayti, legko poteryat` i nevoszmojno zabit`', followed: false, location: {city: 'NY', country: 'US'}
    },
    {id: 2, 
        profilePhoto: 'https://images.pexels.com/photos/750565/pexels-photo-750565.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 
        fullName: 'Iggy Pops', status: 'Bamballeyo', followed: true, location: {city: 'Odessa', country: 'US'}
    },
    {id: 3, 
        profilePhoto: 'https://images.pexels.com/photos/5051699/pexels-photo-5051699.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 
        fullName: 'A Horse', status: 'Igogo', followed: false, location: {city: 'Chorni', country: 'Bile'}
    }]
}

const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case FOLLOW: {
            let stateCopy = {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
            debugger
            return stateCopy
        }
        case UNFOLLOW: {
            let stateCopy = {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
            debugger
            return stateCopy
        }
        case SET_USERS: {
            return {...state, users: [...state.users, ...action.users]}
        }
        default: return state
    }
}

export const followAC = (userId) => ({type: FOLLOW, userId: userId})
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId: userId})
export const setUsersAC = (users) => ({type: SET_USERS, users: users})

export default usersReducer