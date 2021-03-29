import { connect } from 'react-redux'
import { compose } from 'redux'
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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)