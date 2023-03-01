import React from "react";

import Users from "./Users";
import API from "../API/index";

const App = () => {
    const [users, setUsers] = React.useState([]);
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

    return (
        <>
            <Users
                users={users}
                onDelete={deleteUser}
                onFavorite={handleChangeFavorite}
            />
        </>
    );
};

export default App;
