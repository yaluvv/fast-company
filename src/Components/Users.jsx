import React from "react";

import Table from "react-bootstrap/Table";
import User from "./User";

const Users = ({ users, onDelete, onFavorite }) => {
  if (!users.length) {
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
          {users.map((user) => {
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
    </div>
  );
};

export default Users;
