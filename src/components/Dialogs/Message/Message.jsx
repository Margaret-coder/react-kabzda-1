import s from './../Dialogs.module.css'

const Message = (props) => {
    let isNotPageOwner = props.userId !== 0 ? s.notPageOwner : ''
    return (
        <div className={s.messageContainer + ' ' + isNotPageOwner}>
            <div className={s.message}>
                <div className={s.circle}></div>
                {props.message} {props.userId}
            </div>
        </div>
    )
}

export default Message