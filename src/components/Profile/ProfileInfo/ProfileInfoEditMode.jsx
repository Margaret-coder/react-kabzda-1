import s from "./ProfileInfo.module.css"
import { Field, reduxForm } from "redux-form"
import { Textarea, Input, createField } from "../../Common/FormControls/FormControls"
import { maxLengthCreator, required } from "../../../utils/validators/validators"
import { useRef, useState } from "react"

const maxLength10 = maxLengthCreator(10)

const ProfileInfoEditMode_Form = (props) => {
    console.log("render CREATE FIELD")
    let [isChecked, setChecked] = useState(false);
    
console.log("isChecked prob", isChecked)
    const elementRef = useRef()
    if(elementRef.current) console.log("elementRef.current", elementRef.current)
    return (
        <form onSubmit={props.handleSubmit} className={s.profileInfoBlock}>
            <div>
                {createField("About me:", "aboutMe", [required], Input)}
                {createField("Contacts", "contacts", [required], Input)}
                {createField("", "lookingForJob", [], Input, {type: "checkbox", 
                onClick:() => setChecked(!isChecked), ref:elementRef}, "looking for a job")}
                {/* if looking for a job is true */}
                {createField ("Job description:", "jobDescription", [required, maxLength10], Textarea, 
                {hidden:!isChecked})}
            </div> 
            <div>
                <button>Save info</button>
            </div>
        </form>
    )
} 

const ProfileInfoEditModeReduxForm = reduxForm({form: 'profile_info_edit'})(ProfileInfoEditMode_Form)


const ProfileInfoEditMode = (props) => {
    console.log("ProfileInfoEditMode", props)

    const onSubmit = (formData) => {
        let {aboutMe, contacts, lookingForJob, jobDescription} = formData
        console.log("aboutMe, contacts, lookingForJob, jobDescription", aboutMe, contacts, lookingForJob, jobDescription)
        console.log("props.isAuth", props.isAuth)
        props.editProfileInfo(aboutMe, contacts, lookingForJob, jobDescription)
    }
    return <div className={s.descriptionBlock}>
        <h1>Profile Info</h1>
        <ProfileInfoEditModeReduxForm onSubmit={onSubmit}/>
    </div>
}

export default ProfileInfoEditMode