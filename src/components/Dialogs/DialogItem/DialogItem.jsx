import { NavLink } from 'react-router-dom'
import s from './../Dialogs.module.css'


//{s.active}:Dialogs_active__2S0mc
const DialogItem = (props) => {
    return (
        <div className={s.dialogsItems + ' ' + s.active}>
            <NavLink to={"/dialogs/"+props.id}><img src={props.image_src} alt="mem_pic"/> {props.name}</NavLink>
        </div>
    )
}

export default DialogItem