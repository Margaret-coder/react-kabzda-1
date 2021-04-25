import s from './Users.module.css'
import React from 'react'
import Preloader from '../Common/Preloader/Preloader'
import User from './User'
import Paginator from './Paginator'

const Users = (props) => {
    return (
        <div>
        <div>{props.isFetching? <Preloader/> : null}</div>
        <Paginator currentPage={props.currentPage}
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
        onPageChanged={props.onPageChanged}/>
        {
            props.users.map(u=> 
            <User key = {u.id} 
            user={u} follow={props.follow} unfollow={props.unfollow}
            followingInProgress={props.followingInProgress}/>)
        }
    </div>
    )
}

export default Users