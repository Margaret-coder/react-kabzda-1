import s from './Users.module.css'
import React from 'react'
import Preloader from '../Common/Preloader/Preloader'
import User from './User'
import Paginator from './Paginator'

const Users = (props) => {
    console.log('Users props', props)
    return (
        <div>
        <div>{props.isFetching? <Preloader/> : null}</div>
        <Paginator currentPage={props.currentPage}
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
        paginatorPortionSize={props.paginatorPortionSize}
        onPageChanged={props.onPageChanged}/>
        {
            props.users.map(u=> u.userId!==props.userId&&
           // <User key = {u.id} 
            <User key = {u._id} 
            user={u} avaPath={u.avaPath} follow={props.follow} unfollow={props.unfollow}
            followingInProgress={props.followingInProgress} getProfileById={props.getProfileById}/>)
        }
    </div>
    )
}

export default Users