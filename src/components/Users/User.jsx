import { NavLink } from "react-router-dom"
import userPhoto from '../../assets/images/samurai.png'

const User = (props) => {
    console.log('props.userId', props.userId)
    const user = props.user
    return(
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos&&user.photos.small !== null? 
                        user.photos.small : userPhoto}
                    alt="profilePhoto"/>
                    </NavLink>
                </div>
                <div>
                    {user.followed ?
                        <button disabled={props.followingInProgress.some(id => id === user.id)}
                        onClick={()=> {props.unfollow(user.id)}}>
                        Unfollow {user.id}
                        </button> 
                        :
                        <button 
                            disabled={props.followingInProgress.some(id => id === user.id)}
                            onClick={()=> {props.follow(user.id)}}
                        >Follow {user.id}
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