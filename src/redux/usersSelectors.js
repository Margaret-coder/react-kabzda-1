export const getUsers = (state) => {
    return state.usersPage.users
}

export const getUsersPageSize = (state) => {
    return state.usersPage.pageSize
}

export const getUsersTotalCount = (state) => {
    return state.usersPage.totalUsersCount
}

export const getUsersCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const getUsersIsFetching = (state) => {
    return state.usersPage.isFetching
}

export const getUsersFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress
}
