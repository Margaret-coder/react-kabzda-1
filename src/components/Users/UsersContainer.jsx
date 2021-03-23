import Users from './Users'
import {connect} from 'react-redux'
import {follow, unfollow, setUsers, 
    setCurrentPage, setTotalUsersCount,
    setIsLoading, toggleFollowingProgress} from '../../redux/usersReducer'
import React from 'react'
import { userAPI } from '../../api/api'

class UsersContainer extends React.Component {
    constructor(props){
        super(props)
        console.log("I am constructor of Users")
    }
    componentDidMount(){
        this.props.setIsLoading(true)
        userAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.setIsLoading(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            })
    }
    onPageChanged = (pageNumber) => {
        this.props.setIsLoading(true)
        this.props.setCurrentPage(pageNumber)
        userAPI.getUsers(pageNumber, this.props.pageSize)
           .then(data => {
                this.props.setIsLoading(false)
                this.props.setUsers(data.items)
        })         
    }
    render () {
        let l = this.props.isLoading
        return <Users
        isLoading={this.props.isLoading} 
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        followingInProgress={this.props.followingInProgress}
        toggleFollowingProgress={this.props.toggleFollowingProgress}
        />
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isLoading: state.usersPage.isLoading,
        followingInProgress: state.usersPage.followingInProgress,
        toggleFollowingProgress: state.usersPage.followingInProgress
    }
}

export default connect (mapStateToProps, {
    setIsLoading,
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleFollowingProgress
})(UsersContainer)