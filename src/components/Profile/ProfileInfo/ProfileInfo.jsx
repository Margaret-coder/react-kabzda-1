import s from "./ProfileInfo.module.css"

const ProfileInfo = (props) => {
    return (
        <div>
            <div className={s.item}>
                <img
                    src="https://images.pexels.com/photos/1143006/pexels-photo-1143006.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt="sea img"
                />
            </div>
            <div className={s.descriptionBlock}>ava + description</div>
        </div>
    )
}
export default ProfileInfo