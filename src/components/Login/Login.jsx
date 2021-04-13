import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import {Field, reduxForm} from 'redux-form'
import {loginUser} from '../../redux/authReducer'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { Input } from '../Common/FormControls/FormControls'

const maxLengthLogin = maxLengthCreator(20)
const maxLengthPassword = maxLengthCreator(10)

const LoginForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}
        >
            <div>
                <Field placeholder={"Login"} name={"email"} 
                component={Input}
                validate={[required, maxLengthLogin]}/>
            </div>
            <div>
                <Field placeholder={"Password"} 
                name={"password"} type={"password"} 
                component={Input}
                validate={[required, maxLengthPassword]}/>
            </div>
            <div>
                <Field type={"checkbox"} name={"rememberMe"} 
                component={"input"}/> remember me
            </div>
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
        return<Redirect to="/profile"/>
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