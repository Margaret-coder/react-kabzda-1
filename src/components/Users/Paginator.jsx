import style from './Paginator.module.css'
const Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++){
        pages.push(i)
    }
    return(
    <div>{pages.map(p=> { 
            if(props.currentPage === p && style.selectedPage){
            }
            return <span key={p.id} className=
            {props.currentPage === p && style.selectedPage}
            onClick={(e) => {props.onPageChanged(p)}}>{p} </span>
        })}
        <div></div>
        </div>
    )
}

export default Paginator

