import s from "./ProfileInfo.module.css"
import { Field, reduxForm, change } from "redux-form"
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
    const [phone, setPhone] = useState(profile.contacts[0]) 
    const [address, setAddress] = useState(profile.contacts[1]) 
    // console.log('phone:::', phone)
    // console.log('address:::', address)
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
    const [aboutMe, setAboutMe] = useState(profile.aboutMe) 
    const [jobDescription, setLFJobDescription] = useState(profile.LFJobDescription) 
    const [fullname, setFullname] = useState(profile.fullname) 
    var Fields_content_placeholders = {}
    var Fields_content_values = {}
    Fields_content_placeholders.aboutMe = "About me:" 
    Fields_content_placeholders.jobDescription = "Job description:" 
    Fields_content_placeholders.fullname = "Fullname:" 
    let [isChecked, setChecked] = useState(false);
    const clickHandler = (e) => {
        setAboutMe('AAAAAAAAA')
        setLFJobDescription('BBBBBBBB')
        setFullname('CCCCCCCCCCCCC')
        var node = document.getElementsByName('fullname')[0]

    //     console.log('-----------------------------BUTTON CLICK')
    //     console.log(e)
    //     var node = document.getElementsByName('fullname')[0];
    //     console.log('----------NODE', node)
    //     var ev = new Event('change', { bubbles: true});
    //     ev.simulated = true;
    //     console.log('NODE.value', node.value)
    //     var ev4 = new Event('input', {
    //         bubbles: true
    //      });
    //     var ev5 = new Event('focus', {
    //         bubbles: true
    //      });
    //     var ev3 = new MouseEvent('click', {
    //         'view': window, 
    //         'bubbles': true, 
    //         'cancelable': false
    //        });
    //     var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    //     nativeInputValueSetter.call(node, 'Smthinnew');
    //     console.log('NODE.value smth new', node.value)
        
    //     var ev2 = new Event('input', { bubbles: true});
    //     node.dispatchEvent(ev2);
    //     node.dispatchEvent(ev3);
    //     node.dispatchEvent(ev4);
    //     node.dispatchEvent(ev5);
    //     console.log('EVENT 2', ev2)
    //  //   node.value = 'Something new';
    //     console.log('NODE.value', node.value)
    //     node.dispatchEvent(ev);
    //     console.log('EVENT', ev)
    //     console.log('----------NODE', node)
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
                    [], Input, {type: "checkbox", 
                    onClick:() => setChecked(!isChecked)}, "looking for a job")}
                    {/* if looking for a job is true */}
                    {createField (Fields_content_placeholders.jobDescription, "jobDescription",
                    [required, maxLength10], Textarea,
                    {hidden:!isChecked, value:jobDescription, onChange:(e) => setLFJobDescription(e.target.value)})}
                    {createField (Fields_content_placeholders.fullname, "fullname", 
                    [required, maxLength10], Input, {value:fullname, 
                    })}
                    
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
    const onSubmitForm = (formData) => {
        console.log('-----------------------------Submit Form')
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