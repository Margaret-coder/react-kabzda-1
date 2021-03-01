import s from "./Sidebar.module.css"

const Sidebar = () => {
    return (
        <div className={s.sidebar}>
            <h1>Sidebar</h1>
           <div className={s.container}>
                <div className={s.listItem}><div className={s.circle}></div>First </div>
                <div className={s.listItem}>Second </div>
                <div className={s.listItem}>Last</div>
</div>           
        </div>
    )
}
export default Sidebar