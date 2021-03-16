import * as axios from 'axios'
import s from './Users.module.css'
import userPhoto from '../../assets/images/samurai.png'
let Users = (props) => {
    if(props.users.length === 0){
        let users = axios.get(
            "https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                debugger;
                props.setUser(response.data.items)
            })
    }

    return (
    <div>
       {props.users.map(u=> <div key = {u.id}>
           <span>
               <div>
                   {/* <img src={u.profilePhoto} */}
                   <img src={u.photos.small !== null? u.photos.small : userPhoto}
                   alt="profilePhoto"/>
               </div>
               <div>
                   {u.followed ?
                    <button onClick={()=> {props.unfollow(u.id)}}>
                       Unfollow {u.id}
                    </button> 
                    :
                    <button onClick={()=> {props.follow(u.id)}}>
                        Follow {u.id}
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