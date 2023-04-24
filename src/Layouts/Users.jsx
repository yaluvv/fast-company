import React from "react";
import API from "../API/index";
import User from "../Components/Common/Page/UserPage/User";
import UsersList from "../Components/Common/Page/UsersListPage/UsersList";
import { useParams } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = React.useState([]);
    const params = useParams();
    const { id } = params;

    const deleteUser = (id) =>
        setUsers(users.filter((user) => user._id !== id));
    const handleChangeFavorite = (id) =>
        setUsers(
            users.map((user) =>
                user._id === id ? { ...user, bookmark: !user.bookmark } : user
            )
        );

    React.useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);

    return id ? (
        <User id={id} users={users} />
    ) : (
        <UsersList
            users={users}
            onDelete={deleteUser}
            onFavorite={handleChangeFavorite}
        />
    );
};

export default Users;
