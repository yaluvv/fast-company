import React from "react";
import PropTypes from "prop-types";

import API from "../API";
import Table from "react-bootstrap/Table";
import User from "./User";
import Filter from "./Filter";
import AdvancedExample from "./Pagination";
import TotalUsersTitle from "./TotalUsersTitle";

const pageSize = 4;

const Users = ({ users, onDelete, onFavorite }) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [professions, setProfessions] = React.useState([]);
    const [activeProfession, setActiveProfession] = React.useState("");
    const isLoad = React.useRef(true);

    const paginate = (items, currentPage, pageSize) => {
        const startIndex = (currentPage - 1) * pageSize;
        return [...items].splice(startIndex, pageSize);
    };

    React.useEffect(() => {
        API.professions.fetchAll().then((data) => {
            setProfessions(data);
            isLoad.current = false;
        });
    }, []);

    React.useEffect(() => {
        setCurrentPage(1);
    }, [activeProfession]);

    const handleActiveProfession = (item) => {
        setActiveProfession(item);
    };

    const clearFilter = () => {
        setActiveProfession("");
    };
    const filterdUsers = activeProfession
        ? users.filter((user) => user.profession.name === activeProfession)
        : users;

    const itemsCount = filterdUsers.length;

    const usersDivided = paginate(filterdUsers, currentPage, pageSize);

    const handleChangePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <TotalUsersTitle length={itemsCount} />
            <Filter
                items={professions}
                activeProfession={activeProfession}
                onClickProfession={handleActiveProfession}
                onClearFilter={clearFilter}
            />
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
