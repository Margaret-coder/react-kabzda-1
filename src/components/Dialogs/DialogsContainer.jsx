import { connect } from 'react-redux'
import { addMessageActionCreator, updateMessageActionCreator } from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        handleUpdateMessage: (text) => {
            let action = updateMessageActionCreator(text)
            dispatch(action)
        },
        handleSendMessage: () => {
            let action = addMessageActionCreator()
            dispatch(action)
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
export default DialogsContainer