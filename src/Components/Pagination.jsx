import React from "react";
import Pagination from "react-bootstrap/Pagination";
import _ from "lodash";
import PropTypes from "prop-types";

function AdvancedExample({ pageSize, itemsCount, currentPage, onChangePage }) {
    const countPageItems = Math.ceil(itemsCount / pageSize);
    const pagesItems = _.range(1, countPageItems + 1);

    if (pageSize >= itemsCount) {
        return null;
    }
    return (
        <Pagination>
            {pagesItems.map((page) => (
                <Pagination.Item
                    active={currentPage === page}
                    onClick={() => onChangePage(page)}
                    key={page}
                >
                    {page}
                </Pagination.Item>
            ))}
        </Pagination>
    );
}

AdvancedExample.propTypes = {
    pageSize: PropTypes.number.isRequired,
    itemsCount: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired
};

export default AdvancedExample;
