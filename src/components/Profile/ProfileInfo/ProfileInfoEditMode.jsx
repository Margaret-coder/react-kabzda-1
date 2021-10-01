import s from "./ProfileInfo.module.css"
import { reduxForm, change } from "redux-form"
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router';
import { Textarea, Input, createField, createFieldsArray } from "../../Common/FormControls/FormControls"
import { maxLengthCreator, required } from "../../../utils/validators/validators"
import { useState } from "react"
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const maxLength10 = maxLengthCreator(10)
let editInfoFormData = new FormData()
let contacts_arr = []

const ProfileInfoContacts_Form = (props) => {
    const profile = props.profile
    const [phone, setPhone] = useState(profile.contacts[0]) 
    const [address, setAddress] = useState(profile.contacts[1]) 
    if(phone === undefined) setPhone('')
    if(address === undefined) setAddress('')
    return (
            <form onSubmit={props.handleSubmit} className={s.profileInfoBlock}>
            <div>
                {createFieldsArray("Contacts", "contacts", ['Phone', 'Address'], ['phone', 'address'],
                Input, [{value:phone, onChange:(e) => setPhone(e.target.value)},
                    {value:address, onChange:(e) => setAddress(e.target.value)}])}
            </div> 
            <div>
                <button>Save info contacts</button>
            </div>
        </form>
    )
} 

const ProfileInfoEditMode_Form = (props) => {
    const profile = props.profile
    const [lookingForJob, setLookingForJob] = useState(profile.lookingForJob)
    const [aboutMe, setAboutMe] = useState(profile.aboutMe) 
    const [jobDescription, setLFJobDescription] = useState(profile.LFJobDescription) 
    const [fullname, setFullname] = useState(profile.fullname) 
    var Fields_content_placeholders = {}
    Fields_content_placeholders.aboutMe = "About me:" 
    Fields_content_placeholders.jobDescription = "Job description:" 
    Fields_content_placeholders.fullname = "Fullname:" 
    const clickHandler = (e) => {
        props.change('fullname', fullname);
        props.change('aboutMe', aboutMe);
        props.change('jobDescription', jobDescription);
        props.change('lookingForJob', lookingForJob);
    }
    return (
            <form onSubmit={props.handleSubmit} className={s.profileInfoBlock}>
                <div>
                    {createField("Load image", "image",
                    [], Input, {type:"file", accept:"image/*", multiple:false, 
                    onChange:(e) => editInfoFormData.set('image', e.target.files[0])
                    })}
                    {createField(Fields_content_placeholders.aboutMe, "aboutMe", 
                    [required], Input, {value:aboutMe, onChange:(e) => setAboutMe(e.target.value)},
                    )}
                     {createField("", "lookingForJob",
                    [], Input, {type: "checkbox", checked:lookingForJob,
                    onClick:() => setLookingForJob(!lookingForJob)}, "looking for a job")}
                    {/* if looking for a job is true */}
                    {createField (Fields_content_placeholders.jobDescription, "jobDescription",
                    [required, maxLength10], Textarea,
                    {hidden:!lookingForJob, value:jobDescription, onChange:(e) => setLFJobDescription(e.target.value)})}
                    {createField (Fields_content_placeholders.fullname, "fullname", 
                    [required, maxLength10], Input, {value:fullname, onChange:(e) => setFullname(e.target.value)})}
                    
                </div> 
                <div>
                    <button onClick={clickHandler}>Save info</button>
                </div>
            </form>
    )
} 

const ProfileInfoEditModeReduxForm = reduxForm({form: 'profile_info_edit'})(ProfileInfoEditMode_Form)
const ProfileInfoContactsReduxForm = reduxForm({form: 'profile_contacts'})(ProfileInfoContacts_Form)

const ProfileInfoEditMode = (props) => {
    let history = useHistory();
    const onSubmit = (formData) => {
        const {contacts} = formData
        for (var key in contacts) {
                contacts_arr.push(contacts[key])
        }
    }
    const onSubmitForm = (formData) => {
        console.log('-----------------------------Submit Form')
        let {aboutMe, lookingForJob, jobDescription, fullname} = formData
        const status = ""
        editInfoFormData.append("contacts[]", contacts_arr[0])
        editInfoFormData.append("contacts[]", contacts_arr[1])
        editInfoFormData.set('userId', props.authorizedUserId)
        editInfoFormData.set("status", status)
        editInfoFormData.set("aboutMe", aboutMe)
        editInfoFormData.set("lookingForJob", lookingForJob)
        editInfoFormData.set("jobDescription", jobDescription)
        editInfoFormData.set("fullname", fullname)
        props.editProfileInfo(editInfoFormData)
        history.push({
            pathname: "/profile",
            state: { editMode: false }
        })
    }
    
    return <div className={s.descriptionBlock}>
        <h1>Profile Info</h1>
        <ProfileInfoContactsReduxForm profile={props.profile} 
        onSubmit={onSubmit}/>
        <ProfileInfoEditModeReduxForm profile={props.profile} 
        onSubmit={onSubmitForm}/>
    </div>
}

const mapStateToProps = () => {
    return {
  
    }
  } 
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({change}, dispatch);
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfoEditMode);