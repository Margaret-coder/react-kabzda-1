import Users from './Users'
import {connect} from 'react-redux'
import {follow, unfollow, 
    setCurrentPage, toggleFollowingProgress,
    getUsers} from '../../redux/usersReducer'
import React from 'react'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

class UsersContainer extends React.Component {
    componentDidMount(){
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }
    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
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
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
        // toggleFollowingProgress: state.usersPage.followingInProgress
    }
}

export default compose(
    connect (mapStateToProps, {
         follow, unfollow, setCurrentPage,
         toggleFollowingProgress, getUsers
         }),
    withAuthRedirect
)
(UsersContainer)