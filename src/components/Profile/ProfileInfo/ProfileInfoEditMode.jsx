import s from "./ProfileInfo.module.css"
import { Field, reduxForm } from "redux-form"
import { Textarea, Input, createField, createFieldsArray } from "../../Common/FormControls/FormControls"
import { maxLengthCreator, required } from "../../../utils/validators/validators"
import { useEffect, useState } from "react"

const maxLength10 = maxLengthCreator(10)
let editInfoFormData = new FormData()

const ProfileInfoContacts_Form = (props) => {
    return (
            <form onSubmit={props.handleSubmit} className={s.profileInfoBlock}>
            <div>
                {createField("Phone:", "phone", [], Input)}
                {createField("Address:", "address", [], Input)}
                {/* {createField("Contacts", "contacts", [required], Input)} */}
                {/* {createFieldsArray("Contacts", "contacts", "Form2", one, two, three)} */}
            </div> 
            <div>
                <button>Save info contacts</button>
            </div>
        </form>
    )
} 

const ProfileInfoEditMode_Form = (props) => {
    let [isChecked, setChecked] = useState(false);
    const imageHandler = (event) => {
        const file = event.target.files[0]
        editInfoFormData.set('image', file)
        console.log('editInfoFormData image', editInfoFormData.get('image'))
    }
    return (
            <form onSubmit={props.handleSubmit} className={s.profileInfoBlock}>
                <div>
                    <div className={s.item}>
                        <input type="file" name="image" accept="image/*" 
                        multiple={false} onChange={imageHandler} />
                    </div>
                </div>
                <div>
                    {createField("About me:", "aboutMe", [required], Input)}
                    {/* {createField("Contacts", "contacts", [required], Input)} */}
                    {createField("", "lookingForJob", [], Input, {type: "checkbox", 
                    onClick:() => setChecked(!isChecked)}, "looking for a job")}
                    {/* if looking for a job is true */}
                    {createField ("Job description:", "jobDescription", [required, maxLength10], Textarea, 
                    {hidden:!isChecked})}
                    {createField ("Fullname", "fullname", [required, maxLength10], Input)}
                </div> 
                <div>
                    <button>Save info</button>
                </div>
            </form>
    )
} 

const ProfileInfoEditModeReduxForm = reduxForm({form: 'profile_info_edit'})(ProfileInfoEditMode_Form)
const ProfileInfoContactsReduxForm = reduxForm({form: 'profile_contacts'})(ProfileInfoContacts_Form)

let contacts = []
const ProfileInfoEditMode = (props) => {
    const onSubmitForm = (formData) => {
        let {aboutMe, lookingForJob, jobDescription, fullname} = formData
        console.log("Contacts:", contacts)
        console.log("image_FormData:", editInfoFormData)
        console.log("formData:", formData)
        const status = ""
        editInfoFormData.set('userId', props.authorizedUserId)
        editInfoFormData.set("status", status)
        editInfoFormData.set("aboutMe", aboutMe)
        editInfoFormData.append("contacts[]", contacts[0])
        editInfoFormData.append("contacts[]", contacts[1])
        editInfoFormData.set("lookingForJob", lookingForJob)
        editInfoFormData.set("jobDescription", jobDescription)
        editInfoFormData.set("fullname", fullname)
        props.editProfileInfo(editInfoFormData)
    }
    
    const onSubmit = (formData) => {
        console.log("formData:", formData)
        for (var key in formData) {
            console.log(key, formData[key]);
            contacts.push(formData[key])
        }
        console.log("Contacts", contacts)
    }
    return <div className={s.descriptionBlock}>
        <h1>Profile Info</h1>
        <ProfileInfoContactsReduxForm onSubmit={onSubmit}/>
        <ProfileInfoEditModeReduxForm onSubmit={onSubmitForm}/>
    </div>
}

export default ProfileInfoEditMode