import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TableBody = ({ data, columns }) => {
    const renderContent = (id, obj, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(obj);
            }
            return component;
        } else {
            return columns[column].key === "name" ? (
                <Link to={`/users/${id}`}>
                    {_.get(obj, columns[column].key)}
                </Link>
            ) : (
                _.get(obj, columns[column].key)
            );
        }
    };
    return (
        <tbody>
            {data.map((item) => {
                return (
                    <tr key={item._id}>
                        {Object.keys(columns).map((column) => {
                            return (
                                <td key={column}>
                                    {renderContent(item._id, item, column)}
                                </td>
                            );
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
};

TableBody.propTypes = {
    columns: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
};

export default TableBody;
