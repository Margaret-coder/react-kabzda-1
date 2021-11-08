import s from './Users.module.css'
import { NavLink } from "react-router-dom"
import userPhoto from '../../assets/images/samurai.png'
// onclick Load Profile Info By Id, then redirect to Profile Page
const User = (props) => {
    const user = props.user
    console.log('props::', props)
    console.log('user._id::', user._id)
    const follow = user.followers.includes(props.authUserId)
    console.log('is_follow', follow)
    return(
        <div>
            <span>
                <div>
                    <NavLink to={{pathname:'/profile/' + user._id, 
                    state: { editMode: false, edible: false, userId: user._id }}}>
                        {/* <img src={user.photos&&user.photos.small !== null? 
                        user.photos.small : userPhoto} */}
                        <div className={s.ava}>
                            <img src={user.avaPath||user.photos&&user.photos.small !== null? 
                            user.avaPath : userPhoto}
                            alt="profilePhoto"/>
                        </div>
                    </NavLink>
                </div>
                <div>
                    {/* {user.followed ? */}
                    {user.followers.includes(props.authUserId) ?
                        // <button disabled={props.followingInProgress.some(id => id === user.id)}
                        <button disabled={props.followingInProgress.some(id => id === user._id)}
                        onClick={()=> {props.unfollow(user._id)}}>
                        Unfollow {user._id}
                        </button> 
                        :
                        <button 
                            disabled={props.followingInProgress.some(id => id === user._id)}
                            onClick={()=> {props.follow(user._id)}}
                        >Follow {user._id}
                        </button>
                        }
                </div>
            </span>
            <span>
                    <span>
                        <div>{user.name}</div><div>{user.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.city"}</div>
                        <div>{"u.location.country"}</div>
                    </span>
            </span>
        </div>
    )
}        
export default User