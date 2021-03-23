let FOLLOW = 'FOLLOW'
let UNFOLLOW = 'UNFOLLOW'
let SET_USERS = 'SET_USERS'
let SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
let SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
let SET_IS_LOADING_VAL = 'SET_IS_LOADING_VAL'
let FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS'

let initialState = {
     users: [
    // {id: 1, 
    //     profilePhoto: 'https://images.pexels.com/photos/157920/woman-face-curly-hair-157920.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    //     fullName: 'Girlu', status: 'Menya trudno nayti, legko poteryat` i nevoszmojno zabit`', followed: false, location: {city: 'NY', country: 'US'}
    // },
    // {id: 2, 
    //     profilePhoto: 'https://images.pexels.com/photos/750565/pexels-photo-750565.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 
    //     fullName: 'Iggy Pops', status: 'Bamballeyo', followed: true, location: {city: 'Odessa', country: 'US'}
    // },
    // {id: 3, 
    //     profilePhoto: 'https://images.pexels.com/photos/5051699/pexels-photo-5051699.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 
    //     fullName: 'A Horse', status: 'Igogo', followed: false, location: {city: 'Chorni', country: 'Bile'}
    // }
    ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 8,
    isLoading: false,
    followingInProgress: []
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
            return stateCopy
        }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case SET_IS_LOADING_VAL: {
            return {...state, isLoading: action.isLoading}
        }
        case FOLLOWING_IN_PROGRESS: {
            return {
                ...state, 
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : [state.followingInProgress
                    .filter(id => id !== action.userId)]
            }
        }
        default: return state
    }
}

export const follow = (userId) => ({type: FOLLOW, userId: userId})
export const unfollow = (userId) => ({type: UNFOLLOW, userId: userId})
export const setUsers = (users) => ({type: SET_USERS, users: users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})
export const setIsLoading = (isLoading) => ({type: SET_IS_LOADING_VAL, isLoading})
export const toggleFollowingProgress = (isFetching, userId) => ({type: FOLLOWING_IN_PROGRESS, isFetching, userId})

export default usersReducer