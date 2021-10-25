import s from "./ProfileInfo.module.css"
import { reduxForm, change } from "redux-form"
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router';
import { Textarea, Input, createField, createFieldsArray } from "../../Common/FormControls/FormControls"
import { maxLengthCreator, required } from "../../../utils/validators/validators"
import React, { useRef, useState } from "react"
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Fields_names, Fields_placeholders } from "./data_names";

const maxLength10 = maxLengthCreator(10)
let editInfoFormData = new FormData()
let contacts_arr = []

const ProfileInfoEditMode_Form = (props) => {
    const profile = props.profile
    
    const [phone, setPhone] = useState(profile.contacts[0]) 
    const [address, setAddress] = useState(profile.contacts[1]) 
    if(phone === undefined) setPhone('')
    if(address === undefined) setAddress('')
    contacts_arr[0] = phone
    contacts_arr[1] = address

    const [image, setImage] = useState(profile.avaPath)
    const [lookingForJob, setLookingForJob] = useState(profile.lookingForJob)
    const [aboutMe, setAboutMe] = useState(profile.aboutMe) 
    const [jobDescription, setLFJobDescription] = useState(profile.LFJobDescription) 
    const [fullname, setFullname] = useState(profile.fullname) 
    
    const clickHandler = (e) => {
        props.change(Fields_names.phone, phone);
        props.change( Fields_names.address, address);
        props.change(Fields_names.aboutMe, aboutMe);
        props.change(Fields_names.lookingForJob, lookingForJob);
        props.change(Fields_names.jobDescription, jobDescription);
        props.change(Fields_names.fullname, fullname);
    }
    const loadImage = (e) => {
        editInfoFormData.set('image', e.target.files[0])
        setImage(e.target.files[0].name)
        console.log(e.target.files[0])
    }
    const handleParentClick = (e) => { 
        e.preventDefault();
        console.log('parent CLICK');
    }
    const handleChildClick = (e) => {
        e.stopPropagation();
        console.log('child CLICK');
    }
    return (
            <form onSubmit={props.handleSubmit} className={s.profileInfoBlock}>
                <div>
                    {createFieldsArray("Contacts", "contacts", 
                    [Fields_placeholders.phone, Fields_placeholders.address], 
                    [Fields_names.phone, Fields_names.address], 
                    [[required, maxLength10],[required, maxLength10]],
                    Input, [{value:phone, onChange:(e) => setPhone(e.target.value)},
                        {value:address, onChange:(e) => setAddress(e.target.value)}])}
                </div> 
                <div>
                    <div className={s.imageWrap}>
                        <button onClick={handleParentClick} id={s.button_id}>
                            {/* Select File */}
                            {createField(Fields_placeholders.loadImage, Fields_names.image,
                            [], Input, {type:"file", accept:"image/*", multiple:false, 
                            value:'', // problematic value => custom file load
                            onClick:(e) => handleChildClick(e),
                            onChange:(e) => loadImage(e)
                            })}Load img
                        </button>
                    </div>
                    <div>{image}</div>
                    {createField(Fields_placeholders.aboutMe, Fields_names.aboutMe, 
                    [required], Input, {value:aboutMe, onChange:(e) => setAboutMe(e.target.value)},
                    )}
                     {createField("", Fields_names.lookingForJob,
                    [], Input, {type: "checkbox", checked:lookingForJob,
                    onClick:() => setLookingForJob(!lookingForJob)}, "looking for a job")}
                    {/* if looking for a job is true */}
                    {createField (Fields_placeholders.jobDescription, Fields_names.jobDescription,
                    [required, maxLength10], Textarea,
                    {hidden:!lookingForJob, value:jobDescription, onChange:(e) => setLFJobDescription(e.target.value)})}
                    {createField (Fields_placeholders.fullname, Fields_names.fullname, 
                    [required, maxLength10], Input, {value:fullname, onChange:(e) => setFullname(e.target.value)})}
                    
                </div> 
                <div>
                    <button onClick={clickHandler}>Save info</button>
                </div>
            </form>
    )
} 

const ProfileInfoEditModeReduxForm = reduxForm({form: 'profile_info_edit'})(ProfileInfoEditMode_Form)

const ProfileInfoEditMode = (props) => {
    let history = useHistory();
    const onSubmitForm = (formData) => {
        console.log('-----------------------------Submit Form')
        let {aboutMe, lookingForJob, jobDescription, fullname} = formData
        const status = ""
        editInfoFormData.set("contacts[]", contacts_arr[0])
        editInfoFormData.append("contacts[]", contacts_arr[1])
        contacts_arr = []
        editInfoFormData.set('userId', props.authorizedUserId)
        editInfoFormData.set("status", status)
        editInfoFormData.set("aboutMe", aboutMe)
        editInfoFormData.set("lookingForJob", lookingForJob)
        editInfoFormData.set("jobDescription", jobDescription)
        editInfoFormData.set("fullname", fullname)
        props.editProfileInfo(editInfoFormData)
        history.push({
            pathname: "/profile",
            state: { editMode: false, edible: true }
        })
    }
    
    return <div className={s.descriptionBlock}>
        <h1>Profile Info</h1>
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