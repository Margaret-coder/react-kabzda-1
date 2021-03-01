import s from "./Sidebar.module.css"
import SidebarItem from "./SidebarItem/SidebarItem"

const Sidebar = (props) => {
    let sidebarElements = props.sidebar.sidebarData.map((el) => <SidebarItem key={el.id} name={el.name}/>)
    return (
        <>
            <div>{sidebarElements}</div>

            {/* <div className={s.sidebar}>
                <h1>Sidebar</h1>
                <div className={s.container}>
                    <div className={s.listItem}><div className={s.circle}></div>First </div>
                    <div className={s.listItem}>Second </div>
                    <div className={s.listItem}>Last</div>
                </div>
            </div> */}
        </>
    )
}
export default Sidebar