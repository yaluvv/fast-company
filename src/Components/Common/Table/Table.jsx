import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

const TableUsers = ({ columns, currentSort, onSort, users }) => {
    return (
        <Table striped bordered hover size="sm">
            <TableHead
                columns={columns}
                onSort={onSort}
                currentSort={currentSort}
            />
            <TableBody data={users} columns={columns} />
        </Table>
    );
};

TableUsers.propTypes = {
    columns: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    currentSort: PropTypes.object.isRequired
};

export default TableUsers;
