import s from "./ProfileInfo.module.css"
import blankImage from "../../../assets/images/samurai.png"
import ProfileStatusWithHooks from "../ProfileStatusWithHooks"
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { useState } from "react"

const ProfileInfo = (props) => {
    const image = window.location.origin + '/' + props.profile.avaPath
    // const [uploadStatus] = useState('');
    const imageHandler = (event) => {
        const file = event.target.files[0]
        const formData = new FormData()
        console.log('file', file)
        formData.append('image', file)
        formData.append('userId', props.authorizedUserId)
        props.uploadImage(formData)
        console.log('Blank image', blankImage)
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                {props.profile.avaPath && <div className={s.ava}>
                    <img src={image ? image : blankImage} 
                    alt="large_pic"/>
                </div>}
                {/* For Authorized Profile Only - block - props.edible condition */}
                {props.edible &&
                <> 
                    <div className={s.item}>
                        <input type="file" name="image" accept="image/*" multiple={false} onChange={imageHandler} />
                        <div>
                            <Link to={{
                                pathname: "/profile",
                                state: { editMode: true, edible: true }
                            }}>
                            <button>Edit profile</button>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
                    </div>
                </>
                }
                {/* end of block */}
                {!props.edible&&<div>{props.profile.status}</div>}
                <div>About me: {props.profile.aboutMe}</div>
                <ul className={s.no_bullets}>Contacts:
                    {Object.keys(props.profile.contacts).map
                        (function (key) {
                            return (
                                <li key={key} className={s.no_bullets}>{props.profile.contacts[key]}</li>
                            )
                        })}
                </ul>
                {/* <div>Looking for a job: {props.profile.lookingForAJob.toString()}</div> */}
                <div>Looking for a job: <input type="checkbox" defaultChecked={props.profile.lookingForJob.toString()} /></div>
                {/* <div>Looking for a job description: {props.profile.lookingForAJobDescription}</div> */}
                <div>Looking for a job description: {props.profile.LFJobDescription}</div>
                <div>Fullname: {props.profile.fullname}</div>
            </div>
        </div>
    )
}
export default ProfileInfo