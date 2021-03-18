import Users from './Users'
import {connect} from 'react-redux'
import {follow, unfollow, setUsers, 
    setCurrentPage, setTotalUsersCount,
    setIsLoading} from '../../redux/usersReducer'
import * as axios from 'axios'
import React from 'react'

class UsersContainer extends React.Component {
    constructor(props){
        super(props)
        console.log("I am constructor of Users")
    }
    componentDidMount(){
        this.props.setIsLoading(true)
        axios.get(
            `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setIsLoading(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }
    onPageChanged = (pageNumber) => {
        this.props.setIsLoading(true)
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
        .then(response => {
            this.props.setIsLoading(false)
            this.props.setUsers(response.data.items)
        })         
    }
    render () {
        let l = this.props.isLoading
        debugger
        return <Users
        isLoading={this.props.isLoading} 
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}/>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isLoading: state.usersPage.isLoading
    }
}

export default connect (mapStateToProps, {
    setIsLoading,
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount
})(UsersContainer)