import React from "react";

import Users from "./Users";
import API from "../API/index";
import TotalUsersTitle from "./TotalUsersTitle";

const App = () => {
    const [users, setUsers] = React.useState(API.users.fetchAll());
    const deleteUser = (id) =>
        setUsers(users.filter((user) => user._id !== id));
    const addFavorite = (id) =>
        setUsers(
            users.map((user) =>
                user._id === id ? { ...user, bookmark: !user.bookmark } : user
            )
        );
    return (
        <>
            <TotalUsersTitle length={users.length} />
            <Users
                users={users}
                onDelete={deleteUser}
                onFavorite={addFavorite}
            />
        </>
    );
};

export default App;
