import s from "./ProfileInfo.module.css"
import blankImage from "../../../assets/images/samurai.png"
import Preloader from "../../Common/Preloader/Preloader"
import ProfileStatusWithHooks from "../ProfileStatusWithHooks"
import { useEffect, useState } from "react"
import * as axios from 'axios'

const ProfileInfo = (props) => {
    const [uploadStatus, setUploadStatus] = useState('');
    const imageHandler = (event) => {
        const file = event.target.files[0]
        const formData = new FormData()
        console.log('file', file)
        console.log('file', file)
        formData.append('image', file)
        formData.append('userId', props.authorizedUserId)
        props.uploadImage(formData)
    }
    if (!props.profile || !props.authorizedUserId) {
        return <Preloader/>
    }
    else if(!props.profile){
        console.log("HERE")
        return (
        <div>
            <div className={s.item}>
            <input type="file" name="image" accept="image/*" multiple={false} onChange={imageHandler} />
            <h2> {uploadStatus} </h2>
            </div>
        </div>
        )
    }
    else {
        return (
        <div>
            <div className={s.item}>
                {/* <img
                    src="https://images.pexels.com/photos/1143006/pexels-photo-1143006.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt="sea img"
                /> */}
                <div className={s.descriptionBlock}>
                    {/* <img src={props.profile.photos.large} alt="large_pic"/> */}
                    <img src={props.profile.avaPath ? props.profile.avaPath : blankImage} alt="large_pic"/>
                </div>
                <div>
            <div className={s.item}>
            <input type="file" name="image" accept="image/*" multiple={false} onChange={imageHandler} />
            <h2> {uploadStatus} </h2>
            </div>
        </div>
                <div>
                    <ProfileStatusWithHooks status={props.status}
                    updateStatus={props.updateStatus}/>
                </div>
                <div>About me: {props.profile.aboutMe}</div>
                <ul className={s.no_bullets}>Contacts: 
                    {Object.keys(props.profile.contacts).map
                    (function (key)
                    {
                        return (
                        <li key={key} className={s.no_bullets}>{props.profile.contacts[key]}</li>
                        )
                    })}</ul>
                {/* <div>Looking for a job: {props.profile.lookingForAJob.toString()}</div> */}
                <div>Looking for a job: <input type="checkbox" defaultChecked={props.profile.lookingForJob.toString()}/></div>
                {/* <div>Looking for a job description: {props.profile.lookingForAJobDescription}</div> */}
                <div>Looking for a job description: {props.profile.LFJobDescription}</div>
                <div>Fullname: {props.profile.fullname}</div>
            </div>
        </div>
        )
    }
}
export default ProfileInfo