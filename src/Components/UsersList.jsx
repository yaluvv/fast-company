import React from "react";
import PropTypes from "prop-types";

import _ from "lodash";

import API from "../API";
import Filter from "./Filter";
import AdvancedExample from "./Pagination";
import TotalUsersTitle from "./TotalUsersTitle";
import Table from "./Table";
import Bookmark from "./Bookmark";
import QualitiesList from "./QualitiesList";

const pageSize = 8;

const UsersList = ({ users, onDelete, onFavorite }) => {
    const [sortBy, setSortBy] = React.useState({ iter: "name", dir: "asc" });
    const [currentPage, setCurrentPage] = React.useState(1);
    const [professions, setProfessions] = React.useState([]);
    const [activeProfession, setActiveProfession] = React.useState("");
    const isLoad = React.useRef(true);

    const columns = {
        name: { key: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        profession: { key: "profession.name", name: "Профессия" },
        completedMeetings: { key: "completedMeetings", name: "Встретился раз" },
        rate: { key: "rate", name: "Оценка" },
        bookmark: {
            key: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    changeFavorite={() => onFavorite(user._id)}
                    bookmark={user.bookmark}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => onDelete(user._id)}
                >
                    Delete
                </button>
            )
        }
    };

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

    const handleSort = (item) => {
        setSortBy(item);
    };

    const clearFilter = () => {
        setActiveProfession("");
    };
    const filterdUsers = activeProfession ? users.filter((user) => user.profession.name === activeProfession) : users;

    const sortedUsers = _.orderBy(filterdUsers, [sortBy.iter], [sortBy.dir]);

    const itemsCount = filterdUsers.length;

    const usersDivided = paginate(sortedUsers, currentPage, pageSize);

    const handleChangePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <TotalUsersTitle length={itemsCount} />
            <div className="table-down">
                <Filter
                    items={professions}
                    activeProfession={activeProfession}
                    onClickProfession={handleActiveProfession}
                    onClearFilter={clearFilter}
                />
                <Table
                    columns={columns}
                    onSort={handleSort}
                    users={usersDivided}
                    currentSort={sortBy}
                />
            </div>

            <AdvancedExample
                pageSize={pageSize}
                itemsCount={itemsCount}
                currentPage={currentPage}
                onChangePage={handleChangePage}
            />
        </div>
    );
};
UsersList.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onFavorite: PropTypes.func.isRequired
};

export default UsersList;
