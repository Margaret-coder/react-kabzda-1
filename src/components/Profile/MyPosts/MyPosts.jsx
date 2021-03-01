import s from './MyPosts.module.css'
import Post from '../Post/Post.jsx'

const MyPosts = (props) => {

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div><button>Add post</button></div>
            </div>
            <div className={s.posts}>
                {props.posts}
            </div>
        </div>
    )
}

export default MyPosts