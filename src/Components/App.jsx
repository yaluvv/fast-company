import React from "react";

import Users from "./Users";
import API from "../API/index";
import HeadNavbar from "./HeadNavbar";
import { Redirect, Route, Switch } from "react-router-dom";

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
            <HeadNavbar />
            <Switch>
                <Route exact path={"/"} render={() => <h1>Main</h1>} />
                <Route path={"/login"} render={() => <h1>Login</h1>} />
                <Route
                    path={"/users/:id?"}
                    render={(props) => (
                        <Users
                            {...props}
                            users={users}
                            onDelete={deleteUser}
                            onFavorite={handleChangeFavorite}
                        />
                    )}
                />
                <Route path="/404" render={() => <h1>404 NOT FOUND</h1>} />
                <Redirect to="/404" />
            </Switch>
        </>
    );
};

export default App;
