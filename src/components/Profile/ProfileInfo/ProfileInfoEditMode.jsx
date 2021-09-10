import s from "./ProfileInfo.module.css"
import { Field, reduxForm } from "redux-form"
import { Redirect, withRouter } from 'react-router';
import { Textarea, Input, createField, createFieldsArray } from "../../Common/FormControls/FormControls"
import { maxLengthCreator, required } from "../../../utils/validators/validators"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";

const maxLength10 = maxLengthCreator(10)
let editInfoFormData = new FormData()
let contacts_arr = []

const ProfileInfoContacts_Form = (props) => {
    const profile = props.profile
    var Fields_content_placeholders = {}
    Fields_content_placeholders.phone = "Phone" 
    Fields_content_placeholders.address = "Address:" 
    if(profile&&profile.contacts){
        Fields_content_placeholders.phone = profile.contacts[0] 
        Fields_content_placeholders.address = profile.contacts[1]
    }
    return (
            <form onSubmit={props.handleSubmit} className={s.profileInfoBlock}>
            <div>
                {createFieldsArray("Contacts", "contacts", 
                [Fields_content_placeholders.phone, Fields_content_placeholders.address], 
                ['phone', 'address'], Input)}
            </div> 
            <div>
                <button>Save info contacts</button>
            </div>
        </form>
    )
} 

const ProfileInfoEditMode_Form = (props) => {
    const profile = props.profile
    var Fields_content_placeholders = {}
    Fields_content_placeholders.aboutMe = "About me:" 
    Fields_content_placeholders.jobDescription = "Job description:" 
    Fields_content_placeholders.fullname = "Fullname:" 
    if(profile){
        Fields_content_placeholders.aboutMe = profile.aboutMe 
        Fields_content_placeholders.jobDescription = profile.LFJobDescription 
        Fields_content_placeholders.fullname = profile.fullname
    }
    let [isChecked, setChecked] = useState(false);
    const fileHandler = (event) => {
        const file = event.target.files[0]
        editInfoFormData.set('image', file)
    }
    return (
            <form onSubmit={props.handleSubmit} className={s.profileInfoBlock}>
                <div>
                    {createField("Load image", "image", [], Input, {type:"file", accept:"image/*", multiple:false, 
                    function:{fileHandler}
                    })}
                    {createField(Fields_content_placeholders.aboutMe, "aboutMe", [required], Input)}
                    {createField("", "lookingForJob", [], Input, {type: "checkbox", 
                    onClick:() => setChecked(!isChecked)}, "looking for a job")}
                    {/* if looking for a job is true */}
                    {createField (Fields_content_placeholders.jobDescription, "jobDescription", [required, maxLength10], Textarea,
                    {hidden:!isChecked})}
                    {createField (Fields_content_placeholders.fullname, "fullname", [required, maxLength10], Input)}
                </div> 
                <div>
                    <button>Save info</button>
                </div>
            </form>
    )
} 

const ProfileInfoEditModeReduxForm = reduxForm({form: 'profile_info_edit'})(ProfileInfoEditMode_Form)
const ProfileInfoContactsReduxForm = reduxForm({form: 'profile_contacts'})(ProfileInfoContacts_Form)

const ProfileInfoEditMode = (props) => {
    let history = useHistory();
    const onSubmitForm = (formData) => {
        let {aboutMe, lookingForJob, jobDescription, fullname} = formData
        const status = ""
        editInfoFormData.set('userId', props.authorizedUserId)
        editInfoFormData.set("status", status)
        editInfoFormData.set("aboutMe", aboutMe)

        editInfoFormData.append("contacts[]", contacts_arr[0])
        editInfoFormData.append("contacts[]", contacts_arr[1])
        editInfoFormData.set("lookingForJob", lookingForJob)
        editInfoFormData.set("jobDescription", jobDescription)
        editInfoFormData.set("fullname", fullname)
        props.editProfileInfo(editInfoFormData)
        history.push({
            pathname: "/profile",
            state: { editMode: false }
        })
    }
    
    const onSubmit = (formData) => {
        const {contacts} = formData
        for (var key in contacts) {
                contacts_arr.push(contacts[key])
        }
    }
    return <div className={s.descriptionBlock}>
        <h1>Profile Info</h1>
        <ProfileInfoContactsReduxForm profile={props.profile} 
        onSubmit={onSubmit}/>
        <ProfileInfoEditModeReduxForm profile={props.profile} 
        onSubmit={onSubmitForm}/>
    </div>
}

export default ProfileInfoEditMode