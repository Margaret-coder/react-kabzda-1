import Users from './Users'
import {connect} from 'react-redux'
import {follow, unfollow, 
    setCurrentPage, toggleFollowingProgress,
    requestProfiles} from '../../redux/usersReducer'
import React from 'react'
import { getUsers, getUsersCurrentPage,
     getUsersPageSize, getUsersTotalCount, 
     getUsersIsFetching, getUsersFollowingInProgress, getPaginatorPortionSize } from '../../redux/usersSelectors'

class UsersContainer extends React.Component {
    componentDidMount(){
        this.props.requestProfiles(this.props.currentPage, this.props.pageSize)
    }
    onPageChanged = (pageNumber) => {
        this.props.requestProfiles(pageNumber, this.props.pageSize)
    }
    render () {
        console.log('this.props.userId::::', this.props.userId)

        return (
        <Users
        userId={this.props.userId}
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        paginatorPortionSize={this.props.paginatorPortionSize}
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
    console.log('state::::', state)
    return {
        userId: state.auth.userId,
        users: getUsers(state),
        pageSize: getUsersPageSize(state),
        paginatorPortionSize: getPaginatorPortionSize(state),
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
         toggleFollowingProgress, requestProfiles
         })(UsersContainer)