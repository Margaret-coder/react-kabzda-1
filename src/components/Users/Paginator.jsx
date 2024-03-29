import React, {useState} from 'react'
import styles from './Paginator.module.css'
import cn from 'classnames'

const Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++){
        pages.push(i)
    }
    let portionsCount = Math.ceil(pagesCount / props.paginatorPortionSize)
    let [pagePortionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (pagePortionNumber - 1) * props.paginatorPortionSize + 1
    let rightPortionPageNumber = 
    pagePortionNumber * props.paginatorPortionSize    
    return(
    <div className={styles.paginator}>
        {pagePortionNumber > 1 && <button onClick={() => 
            setPortionNumber(pagePortionNumber - 1)}>Prev</button>} 
        {pages.filter
        (p => p >= leftPortionPageNumber 
            && p <= rightPortionPageNumber)
        .map(p => {
            return <span key={p} className=
            {cn(
                {[styles.selectedPage] : props.currentPage === p}
                , styles.pageNumber)}
            onClick={(e) => {props.onPageChanged(p)}}> {p} </span>
        })}
        {pagePortionNumber < portionsCount && <button onClick={()=>
        setPortionNumber(pagePortionNumber + 1)}>Next</button>}
        <div></div>
        </div>
    )
}

export default Paginator

