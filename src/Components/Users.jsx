import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import User from "./User";
import AdvancedExample from "./Pagination";

const pageSize = 4;

const Users = ({ users, onDelete, onFavorite }) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsCount = users.length;

    const paginate = (items, currentPage, pageSize) => {
        const startIndex = (currentPage - 1) * pageSize;
        return [...items].splice(startIndex, pageSize);
    };

    const usersDivided = paginate(users, currentPage, pageSize);

    const handleChangePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (!itemsCount) {
        return <h1>Empty users</h1>;
    }

    return (
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Качества</th>
                        <th>Профессия</th>
                        <th>Встретился раз</th>
                        <th>Оценка</th>
                        <th>Избранное</th>
                    </tr>
                </thead>
                <tbody>
                    {usersDivided.map((user) => {
                        return (
                            <User
                                key={user._id}
                                {...user}
                                onDelete={onDelete}
                                onFavorite={onFavorite}
                            />
                        );
                    })}
                </tbody>
            </Table>
            <AdvancedExample
                pageSize={pageSize}
                itemsCount={itemsCount}
                currentPage={currentPage}
                onChangePage={handleChangePage}
            />
        </div>
    );
};
Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onFavorite: PropTypes.func.isRequired
};

export default Users;
