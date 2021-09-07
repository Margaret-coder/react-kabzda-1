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
    return (
            <form onSubmit={props.handleSubmit} className={s.profileInfoBlock}>
            <div>
                {createFieldsArray("Contacts", "contacts", ['Phone', 'Address'], ['phone', 'address'], Input)}
                {/* {createField("Phone:", "phone", [], Input)}
                {createField("Address:", "address", [], Input)} */}
            </div> 
            <div>
                <button>Save info contacts</button>
            </div>
        </form>
    )
} 

const ProfileInfoEditMode_Form = (props) => {
    let [isChecked, setChecked] = useState(false);
    const fileHandler = (event) => {
        const file = event.target.files[0]
        editInfoFormData.set('image', file)
    }
    return (
            <form onSubmit={props.handleSubmit} className={s.profileInfoBlock}>
                {/* <div>
                    <div className={s.item}>
                        <input type="file" name="image" accept="image/*" 
                        multiple={false} onChange={fileHandler} />
                    </div>
                </div> */}
                <div>
                    {createField("Load image", "image", [], Input, {type:"file", accept:"image/*", multiple:false, 
                    function:{fileHandler}
                    })}
                    {createField("About me:", "aboutMe", [required], Input)}
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
        <ProfileInfoContactsReduxForm onSubmit={onSubmit}/>
        <ProfileInfoEditModeReduxForm onSubmit={onSubmitForm}/>
    </div>
}

export default ProfileInfoEditMode