import s from './Post.module.css'
const Post = (props) => {
    return (
        <div className={s.item}>
            <img src="https://images.pexels.com/photos/905021/pexels-photo-905021.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="avatar"/>
        {props.message}
        <div>
        <span>like:{props.likecount}</span>
        </div>
    </div>
    )
}
export default Post