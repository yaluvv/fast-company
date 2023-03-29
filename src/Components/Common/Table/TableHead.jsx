import React from "react";
import PropTypes from "prop-types";

const TableHead = ({ columns, currentSort, onSort }) => {
    const [active, setActive] = React.useState();
    const handleSort = (item) => {
        if (currentSort.iter === item) {
            onSort({
                ...currentSort,
                dir: currentSort.dir === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ iter: item, dir: "asc" });
        }
    };
    const handleActive = (item) => {
        setActive(item.key);
        handleSort(item.key);
    };

    const changeIcon = (item) => {
        if (item.dir === "asc") {
            return <i className="bi bi-caret-up-fill" />;
        } else {
            return <i className="bi bi-caret-down-fill" />;
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((item) => {
                    return (
                        <th
                            role={columns[item].key ? "button" : undefined}
                            key={item}
                            onClick={() => handleActive(columns[item])}
                        >
                            {columns[item].name}
                            {columns[item].key && columns[item].key === active ? changeIcon(currentSort) : ""}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};

TableHead.propTypes = {
    onSort: PropTypes.func.isRequired,
    currentSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHead;
