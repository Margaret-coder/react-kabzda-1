import Users from './Users'
import {connect} from 'react-redux'
import {follow, unfollow, 
    setCurrentPage, toggleFollowingProgress,
    requestUsers} from '../../redux/usersReducer'
import React from 'react'
import { getUsers, getUsersCurrentPage,
     getUsersPageSize, getUsersTotalCount, 
     getUsersIsFetching, getUsersFollowingInProgress } from '../../redux/usersSelectors'

class UsersContainer extends React.Component {
    componentDidMount(){
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }
    onPageChanged = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.pageSize)
    }
    render () {
        return (
        <Users
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        followingInProgress={this.props.followingInProgress}
        />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getUsersPageSize(state),
        totalUsersCount: getUsersTotalCount(state),
        currentPage: getUsersCurrentPage(state),
        isFetching: getUsersIsFetching(state),
        followingInProgress: getUsersFollowingInProgress(state),
        // toggleFollowingProgress: state.usersPage.followingInProgress
    }
}

export default 
    connect (mapStateToProps, {
         follow, unfollow, setCurrentPage,
         toggleFollowingProgress, requestUsers
         })(UsersContainer)