import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import {reduxForm} from 'redux-form'
import {registrationUser} from '../../redux/authReducer'
import {createNewProfile} from '../../redux/profileReducer'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { createField, Input } from '../Common/FormControls/FormControls'
import style from '../Common/FormControls/FormControls.module.css'

const maxLengthPassword = maxLengthCreator(10)

const RegistrationForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            {createField("Email", "email", [required], Input)}
            {createField("Password", "password", [required, maxLengthPassword], Input, {type:'password'})}
            {props.error&&<div className={style.formSummaryError}>{props.error}</div>}
            <div>
                <button>Registration</button>
            </div>
        </form>
    )
}

const RegistrationReduxForm = reduxForm({form: 'registration'})(RegistrationForm)

const Registration = (props) => {
    const onSubmit = (formData) => {
        let {email, password} = formData
        props.registrationUser(email, password)
    }
    if(props.isAuth){
        return<Redirect  to={{
            pathname: "/profile",
            state: { editMode: true }
        }}/>
    }
    return <div>
        <h1>Registration</h1>
        <RegistrationReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect (mapStateToProps, {registrationUser, createNewProfile})(Registration)
