import s from "./ProfileInfo.module.css"
import Preloader from "../../Common/Preloader/Preloader"
import ProfileStatus from '../ProfileStatus'

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.item}>
                {/* <img
                    src="https://images.pexels.com/photos/1143006/pexels-photo-1143006.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt="sea img"
                /> */}
                <div className={s.descriptionBlock}>
                    <img src={props.profile.photos.large} alt="large_pic"/>
                </div>
                <div>
                    <ProfileStatus status={props.status}
                    updateStatus={props.updateStatus}/>
                </div>
                <div>About me: {props.profile.aboutMe}</div>
                <ul className={s.no_bullets}>Contacts: 
                    {Object.keys(props.profile.contacts).map
                    (function (key)
                    {
                        return (
                        <li key={props.profile.userId} className={s.no_bullets}>{props.profile.contacts[key]}</li>
                        )
                    })}</ul>
                <div>Looking for a job: {props.profile.lookingForAJob.toString()}</div>
                <div>Looking for a job description: {props.profile.lookingForAJobDescription}</div>
                <div>Fullname: {props.profile.fullName}</div>
            </div>
             <div className={s.descriptionBlock}>ava + description</div>
        </div>
    )
}
export default ProfileInfo