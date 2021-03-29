import { connect } from 'react-redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { addMessageActionCreator, updateMessageActionCreator } from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'

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

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

let AuthRedirectComponent = withAuthRedirect(Dialogs)

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)
export default DialogsContainer