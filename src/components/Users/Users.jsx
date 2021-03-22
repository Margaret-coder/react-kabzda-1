import s from './Users.module.css'
import userPhoto from '../../assets/images/samurai.png'
import React from 'react'
import Preloader from '../Common/Preloader/Preloader'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++){
        pages.push(i)
    }
    return (
    <div>
        <div>{props.isLoading? <Preloader/> : null}</div>
        <div>{pages.map(p=> {
            return <span className=
            {props.currentPage === p && s.selectedPage}
            onClick={(e) => {props.onPageChanged(p)}}>{p} </span>
        })}
        <div></div>
        </div>
        {
            props.users.map(u=> 
            <div key = {u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small !== null? 
                            u.photos.small : userPhoto}
                        alt="profilePhoto"/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed ?
                            <button onClick={()=> {
                                axios.delete
                                ( `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                {withCredentials: true, 
                                    // headers: {"API-KEY": ""}
                                },)
                                .then(response => {
                                    if(response.data.resultCode 
                                        === 0)
                                    {
                                        props.unfollow(u.id)
                                    }
                                })
                                props.unfollow(u.id)}}>
                            Unfollow {u.id}
                            </button> 
                            :
                            <button onClick={()=> {
                                        // this.props.toggleIsFetching(false);
                                axios.post
                                ( `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                {},
                                {withCredentials: true,
                                    // headers: {"API-KEY": ""}
                                })
                                .then(response => {
                                    if(response.data.resultCode 
                                        === 0)
                                    {
                                        props.follow(u.id)
                                    }
                                })
                            }}
                            >Follow {u.id}
                            </button>
                            }
                    </div>
                </span>
                <span>
                        <span>
                            <div>{u.name}</div><div>{u.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.city"}</div>
                            <div>{"u.location.country"}</div>
                        </span>
                </span>
            </div>)
        }
    </div>
    )
}

export default Users