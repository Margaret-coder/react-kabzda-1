import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import {reduxForm} from 'redux-form'
import {loginUser} from '../../redux/authReducer'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { createField, Input } from '../Common/FormControls/FormControls'
import style from '../Common/FormControls/FormControls.module.css'

const maxLengthPassword = maxLengthCreator(10)

const LoginForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            {createField("Email", "email", [required], Input)}
            {createField("Password", "password", [required, maxLengthPassword], Input, {type:"password"})}
            {createField("", "rememberMe", [], Input, {type: "checkbox"}, "remember me")}
            {props.error&&<div className={style.formSummaryError}>{props.error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        let {email, password, rememberMe} = formData
        props.loginUser(email, password, rememberMe)
    }
    if(props.isAuth){
        return<Redirect to={{
            pathname: "/profile",
            state: { editMode: false }
        }}/>
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect (mapStateToProps, {loginUser})(Login)