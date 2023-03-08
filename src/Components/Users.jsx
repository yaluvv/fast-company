import React from "react";
import PropTypes from "prop-types";
import User from "./User";
import UsersList from "./UsersList";
import { useParams } from "react-router-dom";

const Users = ({ users, onDelete, onFavorite }) => {
    const params = useParams();
    const { id } = params;
    return id ? (
        <User id={id} />
    ) : (
        <UsersList users={users} onDelete={onDelete} onFavorite={onFavorite} />
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onFavorite: PropTypes.func.isRequired
};

export default Users;
