import Pagination from 'react-js-pagination'

const PaginationComponent = (props) => {
    return (
        props.total > 0 && (
            <Pagination
                innerClass={`pagination justify-content-${props.position}`}
                activePage={props.currentPage}
                activeClass="page-item active"
                itemsCountPerPage={props.perPage}
                totalItemsCount={props.total}
                onChange={props.onChange}
                itemClass="page-item"
                linkClass="page-link"
            />
        )
    )
}

export default PaginationComponent
