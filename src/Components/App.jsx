import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import Users from "../Layouts/Users";
import Main from "../Layouts/Main";
import Auth from "../Layouts/Auth";
import HeadNavbar from "./Common/HeadNavbar";
import EditUser from "../Layouts/EditUser";

const App = () => {
    return (
        <>
            <HeadNavbar />
            <Switch>
                <Route exact path={"/"} component={Main} />
                <Route path={"/auth/:authType"} component={Auth} />
                <Route exact path={"/users/:id?"} component={Users} />
                <Route exact path={"/users/:id/edit"} component={EditUser} />
                <Route path="/404" render={() => <h1>404 NOT FOUND</h1>} />
                <Redirect to="/404" />
            </Switch>
        </>
    );
};

export default App;
