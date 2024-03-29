import s from './Users.module.css'
import React from 'react'
import Preloader from '../Common/Preloader/Preloader'
import User from './User'
import Paginator from './Paginator'

const Users = (props) => {
    return (
        <div className={s.usersBlock}>
            <div>
                <div>{props.isFetching? <Preloader/> : null}</div>
                <div className={s.paginator}>
                    <Paginator currentPage={props.currentPage}
                        totalUsersCount={props.totalUsersCount}
                        pageSize={props.pageSize}
                        paginatorPortionSize={props.paginatorPortionSize}
                        onPageChanged={props.onPageChanged}/>
                </div>
                {
                props.users.map(u=> u._id!==props.authUserId&&
            // <User key = {u.id} 
                <User key = {u._id} authUserId = {props.authUserId}
                user={u} avaPath={u.avaPath} follow={props.follow} unfollow={props.unfollow}
                followingInProgress={props.followingInProgress}/>)
                }
            </div>
        </div>
    )
}

export default Users