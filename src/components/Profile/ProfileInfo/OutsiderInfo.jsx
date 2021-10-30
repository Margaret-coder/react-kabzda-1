import s from "./ProfileInfo.module.css"
import blankImage from "../../../assets/images/samurai.png"
import ProfileStatusWithHooks from "../ProfileStatusWithHooks"

const OutsiderInfo = (props) => {
    // const [uploadStatus] = useState('');
    const image = window.location.origin + '/' + props.profile.avaPath
    console.log('OUTSIDER INFO RENDER')
    return (
        <div>
            <div className={s.item}>
            <div className={s.descriptionBlock}>
                    <img src={image ? image : blankImage} 
                    alt="large_pic"/>
                </div>
                <div>
                    {props.status}
                </div>
                <div>About me: {props.profile.aboutMe}</div>
                <ul className={s.no_bullets}>Contacts: 
                    {Object.keys(props.profile.contacts).map
                    (function (key)
                    {
                        return (
                        <li key={key} className={s.no_bullets}>{props.profile.contacts[key]}</li>
                        )
                    })}
                </ul>
                {/* <div>Looking for a job: {props.profile.lookingForAJob.toString()}</div> */}
                <div>Looking for a job: <input type="checkbox" defaultChecked={props.profile.lookingForJob.toString()}/></div>
                {/* <div>Looking for a job description: {props.profile.lookingForAJobDescription}</div> */}
                <div>Looking for a job description: {props.profile.LFJobDescription}</div>
                <div>Fullname: {props.profile.fullname}</div>
            </div>
        </div>
    )
}
export default OutsiderInfo