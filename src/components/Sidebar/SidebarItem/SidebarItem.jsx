import s from './SidebarItem.module.css'
const Sidebar_Item = (props) => {
return(
    <div className={s.listItem}>
        <div className={s.circle}></div>
        <div>{props.name}</div>
    </div>
)
}
export default Sidebar_Item