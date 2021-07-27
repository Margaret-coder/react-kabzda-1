import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import {reduxForm} from 'redux-form'
import {registrationUser} from '../../redux/authReducer'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { createField, Input } from '../Common/FormControls/FormControls'
import style from '../Common/FormControls/FormControls.module.css'

const maxLengthPassword = maxLengthCreator(10)

const RegistrationForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            {createField("Login", "login", [required], Input)}
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
        let {login, email, password} = formData
        console.log("login, email, password", login, email, password)
        console.log("props.isAuth", props.isAuth)
        props.registrationUser(login, email, password)
    }
    if(props.isAuth){
        return<Redirect to="/profile"/>
    }
    return <div>
        <h1>Registration</h1>
        <RegistrationReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect (mapStateToProps, {registrationUser})(Registration)
