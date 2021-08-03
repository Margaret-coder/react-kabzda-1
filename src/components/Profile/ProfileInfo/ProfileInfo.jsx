import s from "./ProfileInfo.module.css"
import Preloader from "../../Common/Preloader/Preloader"
import ProfileStatusWithHooks from "../ProfileStatusWithHooks"
import { useEffect, useState } from "react"
import * as axios from 'axios'

const my_instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5500/api/'
  })

  const URL_str = 'http://localhost:5500/api/'

const ProfileInfo = (props) => {
    const [uploadStatus, setUploadStatus] = useState('');
    const imageHandler = (event) => {
        const file = event.target.files[0]
        const formData = new FormData()
        console.log('file', file)
        formData.append('image', file)
        formData.append('userId', props.authorizedUserId)
        axios.post(`${URL_str}profile/image`, formData)
        .then(res => res.json())
        .then(res => setUploadStatus(res.msg))
        .catch(error => {console.error(error)})
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
        console.log("props render:", props)
        return (
        <div>
            <div className={s.item}>
                {/* <img
                    src="https://images.pexels.com/photos/1143006/pexels-photo-1143006.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt="sea img"
                /> */}
                <div className={s.descriptionBlock}>
                    {/* <img src={props.profile.photos.large} alt="large_pic"/> */}
                    <img src={props.profile.avaPath} alt="large_pic"/>
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
                <div>Looking for a job: {props.profile.lookingForJob.toString()}</div>
                {/* <div>Looking for a job description: {props.profile.lookingForAJobDescription}</div> */}
                <div>Looking for a job description: {props.profile.LFJobDescription}</div>
                <div>Fullname: {props.profile.fullName}</div>
            </div>
        </div>
        )
    }
}
export default ProfileInfo